function setLanguage(language) {
  const elements = document.querySelectorAll("[data-en], [data-pt]");
  elements.forEach((el) => {
    el.textContent = el.getAttribute(`data-${language}`);
  });
}

document.addEventListener("DOMContentLoaded", () => setLanguage('pt'));



function closeMobileMenu() {
  console.log("closeMobileMenu foi chamado"); // TESTE
  const menu = document.getElementById("mobile-menu");

  if (window.innerWidth <= 768 && menu.classList.contains("open")) {
    menu.classList.remove("open");
    menu.classList.add("hidden");
  }
}


let currentServiceSlide = 0;

function updateServiceSlider() {
    const slider = document.querySelector('.services-slider-container');
    if (!slider || !document.querySelector('.services-slider')) return; // Garante que é o slider correto

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

});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  hamburger.addEventListener("click", function () {
    mobileMenu.classList.toggle("open");
    mobileMenu.classList.toggle("hidden");
  });

  const mobileMenuLinks = document.querySelectorAll("#mobile-menu a");
  mobileMenuLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (mobileMenu.classList.contains("open")) {
        mobileMenu.classList.remove("open");
        mobileMenu.classList.add("hidden");
      }
    });
  });
});

window.addEventListener("resize", () => {
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburger = document.querySelector(".hamburger");

  if (window.innerWidth > 768) {
    // Oculta o menu mobile e reseta classes
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("open");

    // Garante que o botão hamburguer suma se necessário (caso use visibilidade condicional)
    if (hamburger) {
      hamburger.classList.remove("scrolled"); // opcional, caso use estilo scroll
    }
  }
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

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("header nav ul li a");
  const sections = document.querySelectorAll("section"); // Todas as seções com id no HTML
  const logoLink = document.querySelector("header .logo a");

  // Função para remover a classe 'active' de todos os links
  function removeActiveClass() {
    navLinks.forEach(nav => nav.classList.remove("active"));
  }

  // Função para atualizar o menu com base na posição da página
  function updateActiveMenu() {
    let currentSection = ""; // Guarda a seção atual visível

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        currentSection = section.getAttribute("id"); // Captura o id da seção visível
      }
    });

    // Atualiza o menu com a seção atual
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(currentSection)) {
        link.classList.add("active");
      }
    });
  }

  // Evento de clique nos links do menu
  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      removeActiveClass(); // Remove a classe 'active' de todos os links
      this.classList.add("active"); // Adiciona ao link clicado
    });
  });

  // Evento de clique no logo
  logoLink.addEventListener("click", function () {
    removeActiveClass(); // Remove a classe 'active' de todos os links
  });

  // Evento de scroll para atualizar o menu
  window.addEventListener("scroll", updateActiveMenu);
});


//SLIDER PAGINA SOBRE
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".about-slide");
    const dotsContainer = document.querySelector(".slider-nav .dots");
    const prevButton = document.querySelector(".ant");
    const nextButton = document.querySelector(".prox");
    let currentSlide = 0;

    // Criar os dots dinamicamente
    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.dataset.index = i;
        if (i === 0) dot.classList.add("active");
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll("span");

    // Função para atualizar o slider
    function updateSlider(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
        currentSlide = index;
    }

    // Eventos para os dots
    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            const index = parseInt(dot.dataset.index, 10);
            if (index !== currentSlide) updateSlider(index);
        });
    });

    // Eventos para as setas
    prevButton.addEventListener("click", () => {
        const newSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider(newSlide);
    });

    nextButton.addEventListener("click", () => {
        const newSlide = (currentSlide + 1) % slides.length;
        updateSlider(newSlide);
    });

    // Inicializar o slider
    updateSlider(currentSlide);
});



// CONTATO
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("feedback");
  const closeFeedback = document.getElementById("close-feedback");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch("process.php", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.status === "success") {
        // Exibe o popup e limpa o formulário
        feedback.querySelector("p").textContent = result.message;
        feedback.classList.remove("hidden");
        form.reset();
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Mensagem enviada com sucesso!");
    }
  });

  // Fechar o popup
  closeFeedback.addEventListener("click", () => {
    feedback.classList.add("hidden");
  });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  console.log("Enviando formulário...");

  try {
    const response = await fetch("process.php", {
      method: "POST",
      body: formData,
    });
    console.log("Resposta recebida:", response);

    const result = await response.json();
    console.log("Resultado do servidor:", result);

    if (result.status === "success") {
      feedback.querySelector("p").textContent = result.message;
      feedback.classList.remove("hidden");
      form.reset();
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error("Erro ao enviar o formulário:", error);
    alert("Mensagem enviada com sucesso!");
  }
});


function formatPhone(input) {
    let value = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3'); // Aplica o formato (XX) XXXXX-XXXX
    input.value = value;
}


document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById("phone");

    phoneInput.addEventListener("input", function (event) {
        let value = phoneInput.value.replace(/\D/g, ""); // Remove todos os caracteres que não são números

        if (value.length > 11) value = value.slice(0, 11); // Limita o número a 11 dígitos

        // Aplica a máscara
        if (value.length <= 10) {
            // Formato para números com 10 dígitos (sem 9 na frente, ex.: fixos antigos)
            value = value.replace(/^(\d{2})(\d{4})(\d+)/, "($1) $2-$3");
        } else {
            // Formato para números com 11 dígitos (celulares)
            value = value.replace(/^(\d{2})(\d{5})(\d+)/, "($1) $2.$3");
        }

        phoneInput.value = value; // Atualiza o valor do campo
    });
});


document.addEventListener("DOMContentLoaded", () => {
  // Função para definir o idioma
function setLanguage(language) {
  const elements = document.querySelectorAll("[data-en], [data-pt]");
  elements.forEach((el) => {
    el.innerHTML = el.getAttribute(`data-${language}`);
  });

  // Atualiza o botão ativo
  document.querySelectorAll(".language-btn").forEach((btn) => {
    btn.classList.remove("active"); // Remove 'active' de todos os botões
  });

  // Adiciona 'active' apenas ao botão correspondente
  const activeButton = document.getElementById(`toggleLanguage${language.toUpperCase()}`);
  if (activeButton) {
    activeButton.classList.add("active");
  }
}

  // LOADER
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const percent = document.getElementById("loader-percent");

  let progress = 0;

  // Simula a contagem do percentual até 100%
  const interval = setInterval(() => {
    progress += 10; // Aumenta de 10 em 10
    percent.textContent = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);

      // Remove o loader suavemente
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }
  }, 300); // Tempo entre os incrementos (ajuste se necessário)
});




  // Detecta o país do IP usando ip-api
  fetch("http://ip-api.com/json/")
    .then((response) => response.json())
    .then((data) => {
      const country = data.countryCode; // Ex: 'BR' para Brasil
      if (country === "BR") {
        setLanguage("pt"); // Português
      } else {
        setLanguage("en"); // Inglês
      }
    })
    .catch((error) => {
      console.error("Erro ao obter localização:", error);
      setLanguage("pt"); // fallback para português
    });
});



document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.services-slider-container');
  if (!slider) return;

  let startX = 0;
  let startY = 0;

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  slider.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50;

    if (!isHorizontalSwipe) return;

    if (deltaX < 0) {
      nextSlide();
    } else {
      previousSlide();
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuLinks = document.querySelectorAll("#mobile-menu a");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("open");
    });
  });
});

