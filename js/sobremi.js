// ==============================
// SECTION SOBRE MÍ
// ==============================

fetch('components/sobremi.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('sobremi-container').innerHTML = html;
    iniciarSobremiAnimation();
  });

function iniciarSobremiAnimation() {

  const sobremi = document.querySelector('#sobremi');

  if (!sobremi) return;

  // Animación de los números
  function animarNumero(el) {

    // Evita iniciar varias veces simultáneamente
    if (el.dataset.animando === "true") return;

    el.dataset.animando = "true";

    const final = parseInt(el.dataset.target, 10);
    let actual = 0;

    const duracion = 1500;
    const paso = final / (duracion / 16);

    const intervalo = setInterval(() => {

      actual += paso;

      if (actual >= final) {

        if (final === 18) {
          el.textContent = final + " años";
        } else {
          el.textContent = final + "+";
        }

        clearInterval(intervalo);

      } else {

        el.textContent = Math.floor(actual);

      }

    }, 16);
  }

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      const elementosAnimados = sobremi.querySelectorAll(
        '.animate-left, .animate-right'
      );

      if (entry.isIntersecting) {

        // Animación izquierda y derecha
        elementosAnimados.forEach(el => {
          el.classList.add('animate-visible');
        });

        // Animar todos los números
        const numeros = sobremi.querySelectorAll('.animar');

        numeros.forEach(numero => {

          if (!numero.classList.contains('activo')) {

            numero.classList.add('activo');
            animarNumero(numero);

          }

        });

      } else {

        // Ocultar animación lateral
        elementosAnimados.forEach(el => {
          el.classList.remove('animate-visible');
        });

        // Reiniciar números
        const numeros = sobremi.querySelectorAll('.animar');

        numeros.forEach(numero => {

          numero.classList.remove('activo');
          numero.dataset.animando = "false";

          const final = parseInt(numero.dataset.target, 10);

          if (final === 18) {
            numero.textContent = "0 años";
          } else {
            numero.textContent = "0+";
          }

        });

      }

    });

  }, {
    threshold: 0.3
  });

  observer.observe(sobremi);
}
