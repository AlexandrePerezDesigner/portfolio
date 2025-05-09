let currentHighlightImageIndex = 0;
let currentHighlight = null;
let highlights = [];

// Carregar JSON dos Destaques
function loadHighlightsJSON() {
    fetch('highlights.json')
        .then(response => response.json())
        .then(data => {
            highlights = data.highlights;
            console.log("Highlights carregados:", highlights);
        })
        .catch(error => console.error("Erro ao carregar highlights.json:", error));
}

document.addEventListener("DOMContentLoaded", loadHighlightsJSON);

// Abrir o popup de Destaques
function openHighlightPopup(projectId) {
    if (!projectId) {
        console.error("ID do projeto inválido.");
        return;
    }

    currentHighlight = highlights.find(p => p.id === parseInt(projectId));
    if (!currentHighlight) {
        console.error(`Destaque com ID ${projectId} não encontrado.`);
        return;
    }

    currentHighlightImageIndex = 0;
    updateHighlightPopupContent(currentHighlight.images[currentHighlightImageIndex]);

    const popup = document.getElementById('highlight-popup');
    popup.classList.add('show');
    document.body.classList.add('no-scroll');

    configureNavigation();
}

// Atualizar o conteúdo do popup
function updateHighlightPopupContent(media) {
    const img = document.getElementById('highlightPopupImg');
    const video = document.getElementById('highlightPopupVideo');
    const title = document.getElementById('highlightPopupTitle');
    const description = document.getElementById('highlightPopupDescription');
    const progressIndicator = document.getElementById('highlightProgressIndicator');

    // Limpar mídia anterior
    img.style.display = 'none';
    video.style.display = 'none';

    if (media && media.src) {
        // Verificar o tipo de mídia
        if (media.src.endsWith('.mp4')) {
            video.src = media.src;
            video.style.display = 'block';
        } else {
            img.src = media.src;
            img.style.display = 'block';
            img.onclick = () => openHighlightExpandedPopup(media.src);
        }

        // Atualizar título e descrição
        const language = document.documentElement.lang || 'en';
        title.textContent = media[`title_${language}`] || "Sem título";
        description.textContent = media[`description_${language}`] || "";

        // Atualizar indicador de progresso
        progressIndicator.textContent = `${currentHighlightImageIndex + 1}/${currentHighlight.images.length}`;
    } else {
        console.error("Mídia não disponível:", media);
    }
}

// Configurar a navegação
function configureNavigation() {
    const navigation = document.querySelector('.navigation2');
    const prevButton = document.querySelector('.prev2');
    const nextButton = document.querySelector('.next2');

    if (navigation && prevButton && nextButton) {
        // Exibir navegação apenas se houver mais de uma imagem
        if (currentHighlight.images && currentHighlight.images.length > 1) {
            navigation.style.display = 'flex';
        } else {
            navigation.style.display = 'none';
        }

    // Ajustar posição das setas
    const prevButton = document.querySelector('.prev2');
    const nextButton = document.querySelector('.next2');
    prevButton.style.top = '50%';
    nextButton.style.top = '50%';

    } else {
        console.error("Elementos de navegação não encontrados.");
    }
}

// Navegação - Imagem Anterior
function prevHighlightImage() {
    if (currentHighlightImageIndex > 0) {
        currentHighlightImageIndex--;
        updateHighlightPopupContent(currentHighlight.images[currentHighlightImageIndex]);
    }
}

// Navegação - Próxima Imagem
function nextHighlightImage() {
    if (currentHighlightImageIndex < currentHighlight.images.length - 1) {
        currentHighlightImageIndex++;
        updateHighlightPopupContent(currentHighlight.images[currentHighlightImageIndex]);
    }
}

// Fechar o popup
function closeHighlightPopup() {
    const popup = document.getElementById('highlight-popup');
    popup.classList.remove('show');
    document.body.classList.remove('no-scroll');

    // Limpar vídeo em reprodução
    const video = document.getElementById('highlightPopupVideo');
    if (video) video.src = "";
}

// Abrir o popup expandido
function openHighlightExpandedPopup(imageSrc) {
    const expandedPopup = document.getElementById('highlightExpandedPopup');
    const expandedImg = document.getElementById('highlightExpandedImg');

    if (expandedImg && imageSrc) {
        expandedImg.src = imageSrc;
        expandedPopup.classList.add('show');
    } else {
        console.error("Erro ao abrir a imagem expandida.");
    }
}

// Fechar o popup expandido
function closeHighlightExpandedPopup() {
    const expandedPopup = document.getElementById('highlightExpandedPopup');
    if (expandedPopup) expandedPopup.classList.remove('show');
}

// Adicionar eventos às thumbs
document.querySelectorAll('.thumb').forEach(thumb => {
    thumb.addEventListener('click', (event) => {
        event.preventDefault();
        const projectId = thumb.getAttribute('data-highlight-id');
        openHighlightPopup(projectId);
    });
});

// Ajustar comportamento do botão de fechar
document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        closeHighlightPopup();
        closeHighlightExpandedPopup();
    }
});
