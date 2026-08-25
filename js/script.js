// Animación de números al hacer scroll
const elementos = document.querySelectorAll('.animar');

const animarNumero = (el) => {
  const final = parseInt(el.dataset.target, 10);
  let actual = 0;
  const duracion = 1500;
  const paso = final / (duracion / 16);

  const intervalo = setInterval(() => {
    actual += paso;
    if (actual >= final) {
      
      if (final==18) el.textContent = final + " años"; else el.textContent = final + "+";
      
      
      
      clearInterval(intervalo);
    } else {
      el.textContent = Math.floor(actual);
    }
  }, 16);
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      entry.target.classList.add('activo');
      animarNumero(entry.target);

    } else {

      entry.target.classList.remove('activo');
      entry.target.textContent = "0+"; // reinicia número

    }
  });
}, { threshold: 0.2 });

elementos.forEach(el => observer.observe(el));

/* para animar la primera sección del hero */
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".animate-left, .animate-right");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-visible");
      } else {
        entry.target.classList.remove("animate-visible");
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
});












/* ===========================
   MODO CLARO / OSCURO
=========================== */

/*const themeToggle = document.getElementById("themeToggle");

function setTheme(mode) {
  document.body.className = mode;
  localStorage.setItem("theme", mode);
}

themeToggle.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
  setTheme(newTheme);
});

// Cargar tema guardado
setTheme(localStorage.getItem("theme") || "dark");
*/

/* ===========================
   MENÚ HAMBURGUESA
=========================== */
/*const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});
*/

/* ===========================
   BOTÓN VOLVER ARRIBA
=========================== */
/*
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) backToTop.classList.add("show");
  else backToTop.classList.remove("show");
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

*/
