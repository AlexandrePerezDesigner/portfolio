let currentImageIndex = 0;
let currentProject = null;

// Função para carregar os dados do JSON
function loadProjectsJSON() {
    fetch('projects.json') // Nome do arquivo JSON
        .then(response => response.json())
        .then(data => {
            // Definir os dados dos projetos
            window.projects = data.projects;
        })
        .catch(error => console.error("Erro ao carregar o JSON:", error));
}

// Chamar a função para carregar o JSON quando a página for carregada
document.addEventListener("DOMContentLoaded", loadProjectsJSON);

// Função para abrir o popup
function openPopup(projectId) {
    // Encontre o projeto pelo ID
    currentProject = projects.find(p => p.id === projectId);
    if (!currentProject) return;

    currentImageIndex = 0;

    // Carregar a primeira imagem no popup
    updatePopupContent(currentProject.images[currentImageIndex]);

    // Mostrar o popup
    const popup = document.getElementById('popup');
    popup.classList.add('show');

    // Configurar navegação
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

    // Atualizar os elementos do popup com a imagem atual
    popupImage.src = image.src;
    popupTitle.textContent = image.title;
    popupDescription.textContent = image.description;

    // Adicionar evento de clique para expandir a imagem
    popupImage.onclick = openExpandedPopup;
}

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

// Função para alternar entre as seções do portfólio
function showSection(sectionId) {
    // Obter a seção atualmente visível
    const currentSection = document.querySelector('.portfolio.show');
    if (currentSection) {
        // Ocultar a seção atual com transição de opacidade
        currentSection.style.transition = 'opacity 0.5s ease';
        currentSection.style.opacity = 0;
        setTimeout(() => {
            currentSection.classList.remove('show');
            // Mostrar a nova seção após a anterior ser ocultada
            const selectedPortfolio = document.getElementById(sectionId);
            selectedPortfolio.style.opacity = 0;
            selectedPortfolio.classList.add('show');
            selectedPortfolio.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                selectedPortfolio.style.opacity = 1;
            }, 10);
        }, 500);
    } else {
        // Se não houver seção atual, apenas mostrar a nova seção
        const selectedPortfolio = document.getElementById(sectionId);
        selectedPortfolio.style.opacity = 0;
        selectedPortfolio.classList.add('show');
        selectedPortfolio.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            selectedPortfolio.style.opacity = 1;
        }, 10);
    }

    // Atualizar o estilo das abas
    document.querySelectorAll('.tabs button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(sectionId + 'Tab').classList.add('active');
}
