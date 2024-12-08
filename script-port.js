let currentImageIndex = 0;
let currentProject = null;
let projects = [];

// Carregar os dados do JSON
function loadProjectsJSON() {
    fetch('projects.json') // Nome do arquivo JSON
        .then(response => response.json())
        .then(data => {
            projects = data.projects;
        })
        .catch(error => console.error("Erro ao carregar o JSON:", error));
}

// Carregar o JSON quando a página for carregada
document.addEventListener("DOMContentLoaded", loadProjectsJSON);

// Função para abrir o popup
function openPopup(projectId) {
    currentProject = projects.find(p => p.id === projectId);
    if (!currentProject) return;

    currentImageIndex = 0;

    // Carregar a primeira imagem no popup
    updatePopupContent(currentProject.images[currentImageIndex]);

    // Mostrar o popup
    const popup = document.getElementById('popup');
    popup.classList.add('show');

    // Configurar a navegação
    const navigation = document.querySelector('.navigation');
    if (currentProject.images.length > 1) {
        navigation.style.display = 'flex';
    } else {
        navigation.style.display = 'none';
    }
}

// Atualizar o conteúdo do popup
function updatePopupContent(image) {
    const popupImage = document.getElementById('popupImg');
    const popupTitle = document.getElementById('popupTitle');
    const popupDescription = document.getElementById('popupDescription');
    const progressIndicator = document.getElementById('progressIndicator');

    // Verificar o idioma selecionado
    const language = document.documentElement.lang || 'en';

    // Atualizar os elementos do popup com a imagem e descrição no idioma correto
    popupImage.src = image.src;
    popupTitle.textContent = language === 'en' ? (image.title_en || image.title_pt) : (image.title_pt || image.title_en);
    popupDescription.textContent = language === 'en' ? (image.description_en || image.description_pt) : (image.description_pt || image.description_en);

    // Atualizar o indicador de progresso
    if (currentProject && progressIndicator) {
        progressIndicator.textContent = `${currentImageIndex + 1}/${currentProject.images.length}`;
    }

    // Adicionar evento de clique para expandir a imagem
    popupImage.onclick = openExpandedPopup;
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

    // Atualizar o conteúdo do popup, se estiver aberto
    if (currentProject) {
        updatePopupContent(currentProject.images[currentImageIndex]);
    }
}

// Atualize os botões de alternância de idioma para chamar a função corretamente
document.getElementById('toggleLanguagePt').addEventListener('click', () => toggleLanguage('pt'));
document.getElementById('toggleLanguageEn').addEventListener('click', () => toggleLanguage('en'));

// Funções de navegação para próxima e anterior imagem
function prevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updatePopupContent(currentProject.images[currentImageIndex]);
    }
}

function nextImage() {
    if (currentImageIndex < currentProject.images.length - 1) {
        currentImageIndex++;
        updatePopupContent(currentProject.images[currentImageIndex]);
    }
}

// Função para fechar o popup
function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('show');
}

// Função para abrir o popup expandido
function openExpandedPopup() {
    const expandedPopup = document.getElementById('expandedPopup');
    const expandedImg = document.getElementById('expandedImg');
    expandedImg.src = currentProject.images[currentImageIndex].src;
    expandedPopup.classList.add('show');
}

// Função para fechar o popup expandido
function closeExpandedPopup() {
    const expandedPopup = document.getElementById('expandedPopup');
    expandedPopup.classList.remove('show');
}

// Adicionar listener ao botão de alternância de idioma
document.getElementById('toggleLanguage').addEventListener('click', toggleLanguage);

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
