//.. INICIO: Section: Hero
fetch('components/hero.html')
  .then(response => response.text())
  .then(html => {
      document.getElementById('hero-container').innerHTML = html;
      iniciarHeroAnimation();
  });

  function iniciarHeroAnimation() {
      const hero = document.querySelector('#inicio');
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              const elementos = hero.querySelectorAll(
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
      observer.observe(hero);
  }
//.. FIN: Section: Hero