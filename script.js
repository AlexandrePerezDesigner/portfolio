function setLanguage(language) {
  const elements = document.querySelectorAll("[data-en], [data-pt]");
  elements.forEach((el) => {
    el.textContent = el.getAttribute(`data-${language}`);
  });
}

document.addEventListener("DOMContentLoaded", () => setLanguage('en'));

function toggleMenu() {
  const menu = document.getElementById("mobile-menu");
  if (menu) menu.classList.toggle("hidden");
}

let currentServiceSlide = 0;

function updateServiceSlider() {
  const slider = document.querySelector('.services-slider-container');
  if (!slider) return;

  const totalSlides = document.querySelectorAll('.services-slider-container .service').length;

  gsap.to(slider, {
    duration: 0.3,
    x: -currentServiceSlide * 100 + '%',
    ease: 'power2.inOut'
  });

  const leftArrow = document.getElementById('services-arrow-left');
  const rightArrow = document.getElementById('services-arrow-right');

  if (leftArrow) leftArrow.classList.toggle('hidden', currentServiceSlide === 0);
  if (rightArrow) rightArrow.classList.toggle('hidden', currentServiceSlide === totalSlides - 1);
}

function nextServiceSlide() {
  const totalSlides = document.querySelectorAll('.services-slider-container .service').length;
  if (currentServiceSlide < totalSlides - 1) {
    currentServiceSlide++;
    updateServiceSlider();
  }
}

function previousServiceSlide() {
  if (currentServiceSlide > 0) {
    currentServiceSlide--;
    updateServiceSlider();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 768) {
    updateServiceSlider();

    const rightArrow = document.getElementById('services-arrow-right');
    const leftArrow = document.getElementById('services-arrow-left');

    if (rightArrow) rightArrow.addEventListener('click', nextServiceSlide);
    if (leftArrow) leftArrow.addEventListener('click', previousServiceSlide);
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth <= 768) {
    updateServiceSlider();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const servicesSlider = document.querySelector('.services-slider');
  if (window.innerWidth > 768 && servicesSlider) {
    servicesSlider.style.display = 'none'; // Esconde o slider no desktop
  }

  if (window.innerWidth <= 768) {
    updateServiceSlider();

    const rightArrow = document.getElementById('services-arrow-right');
    const leftArrow = document.getElementById('services-arrow-left');

    if (rightArrow) rightArrow.addEventListener('click', nextServiceSlide);
    if (leftArrow) leftArrow.addEventListener('click', previousServiceSlide);
  }
});

window.addEventListener('resize', () => {
  const servicesSlider = document.querySelector('.services-slider');
  if (servicesSlider) {
    if (window.innerWidth > 768) {
      servicesSlider.style.display = 'none'; // Oculta no desktop
    } else {
      servicesSlider.style.display = 'block'; // Exibe no mobile
      updateServiceSlider(); // Atualiza o slider no redimensionamento
    }
  }
});

let currentSlide = 0;

function updateSlider() {
  const slides = document.querySelectorAll('.services-slider-container .service');
  const totalSlides = slides.length;

  // Move o slider para o slide ativo
  const sliderContainer = document.querySelector('.services-slider-container');
  gsap.to(sliderContainer, {
    duration: 0.2,
    x: -currentSlide * 100 + '%',
    ease: 'power2.inOut'
  });

  // Atualiza a visibilidade dos botões
  document.getElementById('arrow-left').classList.toggle('hidden', currentSlide === 0);
  document.getElementById('arrow-right').classList.toggle('hidden', currentSlide === totalSlides - 1);
}

function nextSlide() {
  const totalSlides = document.querySelectorAll('.services-slider-container .service').length;
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    updateSlider();
  }
}

function previousSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlider();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 768) {
    updateSlider();

    // Eventos para os botões
    document.getElementById('arrow-right').addEventListener('click', nextSlide);
    document.getElementById('arrow-left').addEventListener('click', previousSlide);
  }
});

let startX = 0; // Posição inicial do toque
let endX = 0; // Posição final do toque

const slider = document.querySelector('.services-slider-container');

// Função que inicia o toque
slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX; // Registra a posição inicial do toque
});

// Função que registra o movimento do dedo
slider.addEventListener('touchmove', (e) => {
  endX = e.touches[0].clientX; // Atualiza a posição conforme o dedo se move
});

// Função que determina a direção do deslizamento
slider.addEventListener('touchend', () => {
  if (startX > endX + 50) {
    // Deslizar para a esquerda
    nextServiceSlide();
  } else if (startX < endX - 50) {
    // Deslizar para a direita
    previousServiceSlide();
  }
});

// GSAP Scroll Transition
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      const headerOffset = 80; // Ajuste para coincidir com o padding-top do CSS
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: offsetPosition },
        ease: "power2.out",
      });
    });
  });
});

// Sticky Header
document.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const heroContent = document.querySelector(".hero-content");
  const servicesSection = document.querySelector(".services");

  setTimeout(() => {
    heroContent.style.opacity = 1;
    heroContent.style.transform = 'translateY(0)';
  }, 300);

  setTimeout(() => {
    servicesSection.style.opacity = 1;
    servicesSection.style.transform = 'translateY(0)';
  }, 600);

  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector("#mobile-menu");

  hamburger.addEventListener("click", function () {
    mobileMenu.classList.toggle("open");
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const leftArrow = document.querySelector('.arrow-left');
  const rightArrow = document.querySelector('.arrow-right');

  if (leftArrow) {
    leftArrow.addEventListener('click', previousServiceSlide);
  }

  if (rightArrow) {
    rightArrow.addEventListener('click', nextServiceSlide);
  }
});

