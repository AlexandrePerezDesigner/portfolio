let currentImageIndex = 0;
let currentProject = null;
let projects = [];

// Carregar os dados do JSON
function loadProjectsJSON() {
    fetch('projects.json') // Nome do arquivo JSON
        .then(response => response.json())
        .then(data => {
            projects = data.projects;
            console.log("Projetos carregados:", projects);
        })
        .catch(error => console.error("Erro ao carregar o JSON:", error));
}

// Carregar o JSON quando a página for carregada
document.addEventListener("DOMContentLoaded", loadProjectsJSON);

// Função para abrir o popup
function openPopup(projectId) {
    if (!projectId) {
        console.error(`ID inválido: ${projectId}`);
        return;
    }

    currentProject = projects.find(p => p.id === parseInt(projectId));
    if (!currentProject) {
        console.error(`Projeto com ID ${projectId} não encontrado no JSON.`);
        return;
    }

    currentImageIndex = 0;

    // Carregar a primeira mídia no popup
    updatePopupContent(currentProject.images[currentImageIndex]);

    // Mostrar o popup
    const popup = document.getElementById('popup');
    popup.classList.add('show');

    // Impedir o scroll da página atrás do popup
    document.body.classList.add('no-scroll');

    // Configurar a navegação
    const navigation = document.querySelector('.navigation');
    if (currentProject.images.length > 1) {
        navigation.style.display = 'flex';
    } else {
        navigation.style.display = 'none';
    }

    // Ajustar posição das setas
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    prevButton.style.top = '50%';
    nextButton.style.top = '50%';
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('show');

    // Restaurar o scroll da página atrás do popup
    document.body.classList.remove('no-scroll');

    // Parar vídeos no fechamento do popup
    const videoElement = document.querySelector('.popup-media video');
    if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
    }
}

// Atualizar o conteúdo do popup
function updatePopupContent(media) {
    if (!media) {
        console.error("Mídia não encontrada ou inválida.");
        return;
    }

    const popupMediaContainer = document.querySelector('.popup-media');
    const popupTitle = document.getElementById('popupTitle');
    const popupDescription = document.getElementById('popupDescription');
    const progressIndicator = document.getElementById('progressIndicator');

    // Limpar mídia anterior
    popupMediaContainer.innerHTML = '';

    // Verificar o tipo de mídia (imagem ou vídeo)
    if (media.src.endsWith('.mp4')) {
        const video = document.createElement('video');
        video.src = media.src;
        video.controls = true;
        video.autoplay = true;
        video.loop = true;
        video.style.maxWidth = '100%';
        video.style.maxHeight = '70vh';
        popupMediaContainer.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = media.src;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '70vh';
        img.style.objectFit = 'contain';
        img.onclick = openExpandedPopup; // Adiciona evento para expandir a imagem
        popupMediaContainer.appendChild(img);
    }

    // Atualizar título e descrição
    const language = document.documentElement.lang || 'en';
    popupTitle.textContent = language === 'en' ? media.title_en : media.title_pt;
    popupDescription.textContent = language === 'en' ? media.description_en : media.description_pt;

    // Atualizar o indicador de progresso
    if (currentProject && progressIndicator) {
        progressIndicator.textContent = `${currentImageIndex + 1}/${currentProject.images.length}`;
    }
}

// Função para alternar o idioma da página
function toggleLanguage(language) {
    const htmlTag = document.documentElement;
    htmlTag.lang = language;

    // Atualizar os textos da página principal
    const elements = document.querySelectorAll("[data-en], [data-pt]");
    elements.forEach((el) => {
        el.textContent = el.getAttribute(`data-${language}`);
    });

    // Pausar vídeos em execução no popup ou na página
    const allVideos = document.querySelectorAll("video");
    allVideos.forEach((video) => {
        video.pause(); // Pausa o vídeo
        video.currentTime = 0; // Reseta o vídeo para o início
    });

    // Fechar qualquer popup aberto para garantir que os vídeos parem
    const popup = document.getElementById("popup");
    if (popup && popup.classList.contains("show")) {
        popup.classList.remove("show");
        document.body.classList.remove("no-scroll");
    }
}




// Atualize os botões de alternância de idioma para chamar a função corretamente
document.getElementById('toggleLanguagePt').addEventListener('click', () => toggleLanguage('pt'));
document.getElementById('toggleLanguageEn').addEventListener('click', () => toggleLanguage('en'));

// Funções de navegação para próxima e anterior mídia
function prevImage() {
    if (!currentProject || !currentProject.images) {
        console.error("Nenhum projeto carregado ou imagens ausentes.");
        return;
    }

    if (currentImageIndex > 0) {
        currentImageIndex--;
        updatePopupContent(currentProject.images[currentImageIndex]);
    }
}

function nextImage() {
    if (!currentProject || !currentProject.images) {
        console.error("Nenhum projeto carregado ou imagens ausentes.");
        return;
    }

    if (currentImageIndex < currentProject.images.length - 1) {
        currentImageIndex++;
        updatePopupContent(currentProject.images[currentImageIndex]);
    }
}

// Função para abrir o popup expandido
function openExpandedPopup() {
    const expandedPopup = document.getElementById('expandedPopup');
    const expandedImg = document.getElementById('expandedImg');

    if (!currentProject || !currentProject.images[currentImageIndex]) {
        console.error("Nenhum projeto ou mídia atual encontrada para expandir.");
        return;
    }

    // Verificar se a mídia é uma imagem
    const currentMedia = currentProject.images[currentImageIndex];
    if (currentMedia.src.endsWith('.mp4')) {
        console.warn("A mídia atual é um vídeo e não pode ser expandida.");
        return;
    }

    // Definir o src da imagem expandida
    expandedImg.src = currentMedia.src;
    expandedPopup.classList.add('show');
}

// Função para fechar o popup expandido
function closeExpandedPopup() {
    const expandedPopup = document.getElementById('expandedPopup');
    expandedPopup.classList.remove('show');
}

// Função para alternar entre as seções do portfólio
function showSection(sectionId) {
    const currentSection = document.querySelector('.portfolio.show');
    if (currentSection) {
        currentSection.style.transition = 'opacity 0.5s ease';
        currentSection.style.opacity = 0;
        setTimeout(() => {
            currentSection.classList.remove('show');
            const selectedPortfolio = document.getElementById(sectionId);
            selectedPortfolio.style.opacity = 0;
            selectedPortfolio.classList.add('show');
            selectedPortfolio.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                selectedPortfolio.style.opacity = 1;
            }, 10);
        }, 500);
    } else {
        const selectedPortfolio = document.getElementById(sectionId);
        selectedPortfolio.style.opacity = 0;
        selectedPortfolio.classList.add('show');
        selectedPortfolio.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            selectedPortfolio.style.opacity = 1;
        }, 10);
    }

    document.querySelectorAll('.tabs button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(sectionId + 'Tab').classList.add('active');
}

// Função para as thumbs clicáveis
document.querySelectorAll('.thumb').forEach(thumb => {
    thumb.addEventListener('click', (event) => {
        event.preventDefault(); // Previne comportamento padrão do clique
        const projectId = thumb.getAttribute('data-project-id');
        openPopup(projectId);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            hamburger.classList.add("scrolled");
        } else {
            hamburger.classList.remove("scrolled");
        }
    });
});


function showHighlightSection(sectionId) {
  const currentSection = document.querySelector('.highlight.show');
  if (currentSection) {
    currentSection.classList.remove('show');
  }
  const selectedHighlight = document.getElementById(sectionId);
  if (selectedHighlight) {
    selectedHighlight.classList.add('show');
  }

  // Atualiza a aba ativa
  document.querySelectorAll('.tabs2 button').forEach(button => {
    button.classList.remove('active2');
  });
  document.getElementById(sectionId + 'Tab').classList.add('active2');



}


