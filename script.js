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

  slider.style.transform = `translateX(-${currentServiceSlide * 100}%)`;

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
  sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

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


