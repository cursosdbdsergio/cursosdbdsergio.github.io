/* ===== Datos ===== */
const PRODUCTS = [
  { id: 1, name: "Camisa de lino manga larga", price: 39.9, tone: "#5f8f84" },
  { id: 2, name: "Pantalón elástico cintura cómoda", price: 44.5, tone: "#3f5a7a" },
  { id: 3, name: "Vestido midi de viscosa", price: 52.0, tone: "#9b6b7d" },
  { id: 4, name: "Camiseta de algodón básica", price: 19.9, tone: "#c58f3d" },
  { id: 5, name: "Chaqueta ligera de entretiempo", price: 64.9, tone: "#4d5c52" },
  { id: 6, name: "Jersey de punto suave", price: 47.5, tone: "#7a6f9b" }
];
const SIZES = ["XL", "2XL", "3XL", "4XL", "5XL", "6XL"];
const FREE_SHIPPING_FROM = 60;
const SHIPPING_COST = 4.95;
const STORAGE = { theme: "holgura-theme", lang: "holgura-lang", cart: "holgura-cart" };

/* Textos traducibles: se aplican a los elementos con data-i18n.
   Para añadir un texto nuevo: pon data-i18n="clave" en el HTML y añade la clave aquí. */
const TRANSLATIONS = {
  es: {
    "nav.home": "Inicio", "nav.about": "Nosotros", "nav.shop": "Tienda", "nav.sizes": "Guía de tallas", "nav.shipping": "Envíos y pago", "nav.contact": "Contacto",
    "hero.title": "Ropa que te queda bien. Sin excusas, sin tallas escondidas.",
    "hero.text": "Del XL al 6XL, con patrones pensados para tu cuerpo: tejidos suaves, costuras que no aprietan y estilo de verdad.",
    "hero.cta": "Ver la tienda", "hero.cta2": "Encuentra tu talla",
    "shop.title": "Novedades de temporada", "cart.title": "Tu carrito", "cart.total": "Subtotal", "cart.checkout": "Finalizar pedido",
    "cart.empty": "Tu carrito está vacío.", "cart.add": "Añadir al carrito", "search.open": "Buscar en la página",
    "checkout.title": "Finalizar pedido", "checkout.confirm": "Confirmar pedido"
  },
  en: {
    "nav.home": "Home", "nav.about": "About", "nav.shop": "Shop", "nav.sizes": "Size guide", "nav.shipping": "Shipping & payment", "nav.contact": "Contact",
    "hero.title": "Clothes that fit you well. No excuses, no hidden sizes.",
    "hero.text": "From XL to 6XL, with patterns made for your body: soft fabrics, comfortable seams and real style.",
    "hero.cta": "Visit the shop", "hero.cta2": "Find your size",
    "shop.title": "New this season", "cart.title": "Your cart", "cart.total": "Subtotal", "cart.checkout": "Place order",
    "cart.empty": "Your cart is empty.", "cart.add": "Add to cart", "search.open": "Search this page",
    "checkout.title": "Place order", "checkout.confirm": "Confirm order"
  },
  va: {
    "nav.home": "Inici", "nav.about": "Nosaltres", "nav.shop": "Botiga", "nav.sizes": "Guia de talles", "nav.shipping": "Enviaments i pagament", "nav.contact": "Contacte",
    "hero.title": "Roba que et ve bé. Sense excuses, sense talles amagades.",
    "hero.text": "De l'XL al 6XL, amb patrons pensats per al teu cos: teixits suaus, costures còmodes i estil de veritat.",
    "hero.cta": "Veure la botiga", "hero.cta2": "Troba la teua talla",
    "shop.title": "Novetats de temporada", "cart.title": "El teu carret", "cart.total": "Subtotal", "cart.checkout": "Finalitzar comanda",
    "cart.empty": "El teu carret està buit.", "cart.add": "Afegir al carret", "search.open": "Buscar a la pàgina",
    "checkout.title": "Finalitzar comanda", "checkout.confirm": "Confirmar comanda"
  }
};

/* ===== Utilidades ===== */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const euro = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });
const readStorage = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const writeStorage = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* almacenamiento no disponible */ }
};

let currentLang = readStorage(STORAGE.lang, "es");
let cart = readStorage(STORAGE.cart, []);
const t = (key) => TRANSLATIONS[currentLang]?.[key] ?? TRANSLATIONS.es[key] ?? key;

/* ===== Modo claro/oscuro ===== */
function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  writeStorage(STORAGE.theme, isDark ? "dark" : "light");
}
function initTheme() {
  const saved = readStorage(STORAGE.theme, null);
  applyTheme(saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches);
  $("#themeBtn").addEventListener("click", () => applyTheme(!document.body.classList.contains("dark")));
}

/* ===== Navegación: scroll suave, menú móvil y cabecera ===== */
const burger = $("#burgerBtn");
const mobileMenu = $("#mobileMenu");

function setMenu(open) {
  mobileMenu.classList.toggle("is-open", open);
  burger.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", open);
}

function initNavigation() {
  $$("[data-scroll]").forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault();
    setMenu(false);
    $(link.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
  }));
  burger.addEventListener("click", () => setMenu(!mobileMenu.classList.contains("is-open")));
  addEventListener("resize", () => setMenu(false));
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* Sombra en la cabecera y enlace activo según la sección visible */
function onScroll() {
  $("#header").classList.toggle("is-scrolled", scrollY > 10);
  const marker = scrollY + innerHeight * 0.35;
  const current = $$("main section").filter((s) => s.offsetTop <= marker).pop();
  $$(".nav a").forEach((a) => a.classList.toggle("is-active", current && a.hash === `#${current.id}`));
}

/* Aparición de secciones al entrar en pantalla */
function initReveal() {
  const observer = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-visible"); observer.unobserve(e.target); }
  }), { threshold: 0.12 });
  $$(".section .container").forEach((el) => { el.classList.add("reveal"); observer.observe(el); });
}

/* ===== Idioma ===== */
function applyLanguage(lang) {
  currentLang = TRANSLATIONS[lang] ? lang : "es";
  writeStorage(STORAGE.lang, currentLang);
  document.documentElement.lang = currentLang === "va" ? "ca" : currentLang;
  clearHighlights();
  $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  $$("[data-lang-select]").forEach((select) => { select.value = currentLang; });
  renderProducts();
  renderCart();
}

/* ===== Productos y carrito ===== */
function renderProducts() {
  const garment = '<svg viewBox="0 0 24 24"><path d="M8 3 3 6l2 4 2-1v12h10V9l2 1 2-4-5-3a4 4 0 0 1-8 0z"/></svg>';
  $("#productGrid").innerHTML = PRODUCTS.map((p) => `
    <article class="product">
      <div class="product__img" style="--tone:${p.tone}" role="img" aria-label="${p.name}">${garment}</div>
      <div class="product__body">
        <h3>${p.name}</h3>
        <span class="product__price">${euro.format(p.price)}</span>
        <select aria-label="Talla" data-size="${p.id}">${SIZES.map((s) => `<option>${s}</option>`).join("")}</select>
        <button class="btn" data-add="${p.id}">${t("cart.add")}</button>
      </div>
    </article>`).join("");
}

const cartSubtotal = () => cart.reduce((sum, item) => sum + item.price * item.qty, 0);

function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  const size = $(`[data-size="${productId}"]`).value;
  const existing = cart.find((i) => i.id === productId && i.size === size);
  if (existing) existing.qty += 1;
  else cart.push({ id: productId, name: product.name, price: product.price, size, qty: 1 });
  saveCart();
  setDrawer(true);
}

function changeQuantity(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart();
}

function saveCart() {
  writeStorage(STORAGE.cart, cart);
  renderCart();
}

function renderCart() {
  $("#cartCount").textContent = cart.reduce((n, i) => n + i.qty, 0);
  $("#cartTotal").textContent = euro.format(cartSubtotal());
  $("#checkoutBtn").disabled = cart.length === 0;
  $("#cartList").innerHTML = cart.length
    ? cart.map((item, i) => `
      <li>
        <div><strong>${item.name}</strong><br><small>Talla ${item.size} · ${euro.format(item.price)}</small></div>
        <strong>${euro.format(item.price * item.qty)}</strong>
        <div class="qty">
          <button data-qty="${i}" data-delta="-1" aria-label="Quitar uno">−</button>
          <span>${item.qty}</span>
          <button data-qty="${i}" data-delta="1" aria-label="Añadir uno">+</button>
        </div>
      </li>`).join("")
    : `<li class="cart-empty">${t("cart.empty")}</li>`;
}

function setDrawer(open) {
  $("#cartDrawer").classList.toggle("is-open", open);
  $("#overlay").classList.toggle("is-open", open);
}

function initCart() {
  $("#productGrid").addEventListener("click", (e) => {
    const button = e.target.closest("[data-add]");
    if (button) addToCart(Number(button.dataset.add));
  });
  $("#cartList").addEventListener("click", (e) => {
    const button = e.target.closest("[data-qty]");
    if (button) changeQuantity(Number(button.dataset.qty), Number(button.dataset.delta));
  });
  $("#cartBtn").addEventListener("click", () => setDrawer(true));
  $("#cartClose").addEventListener("click", () => setDrawer(false));
  $("#overlay").addEventListener("click", () => setDrawer(false));
}

/* ===== Finalizar pedido y pago ===== */
const checkoutModal = $("#checkoutModal");
const checkoutForm = $("#checkoutForm");

/* Muestra solo las opciones válidas para recogida o envío a domicilio */
function syncCheckoutOptions() {
  const method = checkoutForm.elements.method.value;
  $$("[data-for]", checkoutForm).forEach((el) => { el.hidden = el.dataset.for !== method; });
  const payment = checkoutForm.elements.payment;
  const selected = [...payment].find((r) => r.checked);
  if (selected.closest("[data-for]")?.hidden) {
    [...payment].find((r) => !r.closest("[data-for]")?.hidden).checked = true;
  }
  const shipping = method === "home" && cartSubtotal() < FREE_SHIPPING_FROM ? SHIPPING_COST : 0;
  $("#shipCost").textContent = euro.format(shipping);
  $("#orderTotal").textContent = euro.format(cartSubtotal() + shipping);
  checkoutForm.address.required = method === "home";
}

function buildOrder() {
  const data = new FormData(checkoutForm);
  const shipping = data.get("method") === "home" && cartSubtotal() < FREE_SHIPPING_FROM ? SHIPPING_COST : 0;
  return {
    customer: { name: data.get("name"), phone: data.get("phone"), email: data.get("email") },
    method: data.get("method"),
    address: data.get("address"),
    pickupDate: data.get("pickupDate"),
    payment: data.get("payment"),
    items: structuredClone(cart),
    shipping,
    total: cartSubtotal() + shipping
  };
}

function showPaymentSummary(order) {
  $("#paymentSummary").innerHTML = order.items.map((i) =>
    `<li><span>${i.qty} × ${i.name} (${i.size})</span><strong>${euro.format(i.price * i.qty)}</strong></li>`).join("");
  $("#paymentTotal").textContent = euro.format(order.total);
  $("#payNowBtn").onclick = () => startOnlinePayment(order);
  $("#paymentModal").showModal();
}

/* PUNTO DE INTEGRACIÓN: aquí se conectará la pasarela de pago del mercado.
   Recibe el pedido completo (cliente, artículos, envío y total). */
function startOnlinePayment(order) {
  document.dispatchEvent(new CustomEvent("payment:start", { detail: order }));
}

function completeOrder(order) {
  const messages = {
    onPickup: `Tu reserva está lista. Pasa por el puesto 24 del mercado${order.pickupDate ? " el " + order.pickupDate : ""} y paga al recoger.`,
    onDelivery: "Enviaremos tu pedido a la dirección indicada. Pagarás en el momento de la entrega."
  };
  $("#doneText").textContent = `${messages[order.payment]} Total: ${euro.format(order.total)}.`;
  cart = [];
  saveCart();
  $("#doneModal").showModal();
}

function initCheckout() {
  $("#checkoutBtn").addEventListener("click", () => {
    setDrawer(false);
    syncCheckoutOptions();
    checkoutModal.showModal();
  });
  checkoutForm.addEventListener("change", syncCheckoutOptions);
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const order = buildOrder();
    checkoutModal.close();
    if (order.payment === "online") showPaymentSummary(order);
    else completeOrder(order);
  });
  $$("[data-close-modal]").forEach((b) => b.addEventListener("click", () => b.closest("dialog").close()));
}

/* ===== Búsqueda dentro de la página ===== */
const searchModal = $("#searchModal");
const searchInput = $("#searchInput");
let matches = [];
let matchIndex = -1;

function clearHighlights() {
  $$("mark").forEach((mark) => mark.replaceWith(document.createTextNode(mark.textContent)));
  document.body.normalize();
  matches = [];
  matchIndex = -1;
}

function highlight(term) {
  clearHighlights();
  if (term.length < 2) { $("#searchInfo").textContent = ""; return; }
  const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
  const walker = document.createTreeWalker($("main"), NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) if (regex.test(walker.currentNode.nodeValue)) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const fragment = document.createDocumentFragment();
    let last = 0;
    node.nodeValue.replace(regex, (match, offset) => {
      fragment.append(node.nodeValue.slice(last, offset));
      const mark = document.createElement("mark");
      mark.textContent = match;
      fragment.append(mark);
      last = offset + match.length;
    });
    fragment.append(node.nodeValue.slice(last));
    node.replaceWith(fragment);
  });
  matches = $$("main mark");
  $("#searchInfo").textContent = matches.length ? `${matches.length} coincidencias. Pulsa Intro para ir a la siguiente.` : "Sin resultados.";
  goToMatch(0);
}

function goToMatch(index) {
  if (!matches.length) return;
  matchIndex = (index + matches.length) % matches.length;
  matches.forEach((m, i) => { m.style.outline = i === matchIndex ? "2px solid var(--primary)" : ""; });
  matches[matchIndex].scrollIntoView({ behavior: "smooth", block: "center" });
}

function initSearch() {
  $$("[data-open-search]").forEach((b) => b.addEventListener("click", () => {
    setMenu(false);
    searchModal.showModal();
    searchInput.select();
  }));
  searchInput.addEventListener("input", () => highlight(searchInput.value.trim()));
  searchInput.addEventListener("keydown", (e) => { if (e.key === "Enter") goToMatch(matchIndex + 1); });
}

/* ===== Formulario de contacto y login ===== */
function initForms() {
  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    $("#contactStatus").textContent = "Gracias, te responderemos muy pronto.";
    e.target.reset();
  });
  // PUNTO DE INTEGRACIÓN: escucha "login:open" para mostrar tu sistema de acceso.
  $("#loginBtn").addEventListener("click", () => document.dispatchEvent(new CustomEvent("login:open")));
}

/* ===== Arranque ===== */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavigation();
  initReveal();
  initCart();
  initCheckout();
  initSearch();
  initForms();
  $$("[data-lang-select]").forEach((s) => s.addEventListener("change", () => applyLanguage(s.value)));
  applyLanguage(currentLang);
});
