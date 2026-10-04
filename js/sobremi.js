//.. INICIO: Section: Sobremi
fetch('components/sobremi.html')
  .then(response => response.text())
  .then(html => {
      document.getElementById('sobremi-container').innerHTML = html;
      iniciarSobremiAnimation();
  });

  function iniciarSobremiAnimation() {
      const sobremi = document.querySelector('#sobremi');
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              const elementos = sobremi.querySelectorAll(
                  '.animate-left, .animate-right'
              );
              if (entry.isIntersecting) {
                  elementos.forEach(el => {
                      el.classList.add('animate-visible');
                  });
              } else {
                  elementos.forEach(el => {
                      el.classList.remove('animate-visible');
                  });
              }
          });
      }, {
          threshold: 0.3
      });
      observer.observe(sobremi);
  }
//.. FIN: Section: Sobremi