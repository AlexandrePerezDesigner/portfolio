const images = [
            { src: 'portfolio/01net1.jpg', title: 'Projeto 1', description: 'Descrição do projeto 1.' },
            { src: 'assets/p2.jpg', title: 'Projeto 2', description: 'Descrição do projeto 2.' },
            { src: 'assets/p3.jpg', title: 'Projeto 3', description: 'Descrição do projeto 3.' },
            { src: 'assets/p4.jpg', title: 'Projeto 4', description: 'Descrição do projeto 4.' },
            { src: 'assets/p5.jpg', title: 'Projeto 5', description: 'Descrição do projeto 5.' },
            { src: 'assets/p6.jpg', title: 'Projeto 6', description: 'Descrição do projeto 6.' },

            { src: 'assets/p1.jpg', title: 'Vídeo 1', description: 'Descrição do vídeo 1.' },
            { src: 'assets/p2.jpg', title: 'Vídeo 2', description: 'Descrição do vídeo 2.' },
            { src: 'assets/p3.jpg', title: 'Vídeo 3', description: 'Descrição do vídeo 3.' },
            { src: 'assets/p4.jpg', title: 'Vídeo 4', description: 'Descrição do vídeo 4.' },
            { src: 'assets/p5.jpg', title: 'Vídeo 5', description: 'Descrição do vídeo 5.' },
            { src: 'assets/p6.jpg', title: 'Vídeo 6', description: 'Descrição do vídeo 6.' },

            { src: 'assets/p1.jpg', title: 'Graphic 1', description: 'Descrição do gráfico 1.' },
            { src: 'assets/p2.jpg', title: 'Graphic 2', description: 'Descrição do gráfico 2.' },
            { src: 'assets/p3.jpg', title: 'Graphic 3', description: 'Descrição do gráfico 3.' },
            { src: 'assets/p4.jpg', title: 'Graphic 4', description: 'Descrição do gráfico 4.' },
            { src: 'assets/p5.jpg', title: 'Graphic 5', description: 'Descrição do gráfico 5.' },
            { src: 'assets/p6.jpg', title: 'Graphic 6', description: 'Descrição do gráfico 6.' },

            { src: 'assets/p1.jpg', title: 'Branding 1', description: 'Descrição do branding 1.' },
            { src: 'assets/p2.jpg', title: 'Branding 2', description: 'Descrição do branding 2.' },
            { src: 'assets/p3.jpg', title: 'Branding 3', description: 'Descrição do branding 3.' },
            { src: 'assets/p4.jpg', title: 'Branding 4', description: 'Descrição do branding 4.' },
            { src: 'assets/p5.jpg', title: 'Branding 5', description: 'Descrição do branding 5.' },
            { src: 'assets/p6.jpg', title: 'Branding 6', description: 'Descrição do branding 6.' },

            { src: 'assets/p1.jpg', title: 'Emkt 1', description: 'Descrição do Emkt 1.' },
            { src: 'assets/p2.jpg', title: 'Emkt 2', description: 'Descrição do Emkt 2.' },
            { src: 'assets/p3.jpg', title: 'Emkt 3', description: 'Descrição do Emkt 3.' },
            { src: 'assets/p4.jpg', title: 'Emkt 4', description: 'Descrição do Emkt 4.' },
            { src: 'assets/p5.jpg', title: 'Emkt 5', description: 'Descrição do Emkt 5.' },
            { src: 'assets/p6.jpg', title: 'Emkt 6', description: 'Descrição do Emkt 6.' },

            { src: 'assets/p1.jpg', title: 'Banner 1', description: 'Descrição do Banner 1.' },
            { src: 'assets/p2.jpg', title: 'Banner 2', description: 'Descrição do Banner 2.' },
            { src: 'assets/p3.jpg', title: 'Banner 3', description: 'Descrição do Emkt 3.' },
            { src: 'assets/p4.jpg', title: 'Banner 4', description: 'Descrição do Emkt 4.' },
            { src: 'assets/p5.jpg', title: 'Banner 5', description: 'Descrição do Emkt 5.' },
            { src: 'assets/p6.jpg', title: 'Banner 6', description: 'Descrição do Emkt 6.' }
];

let currentImageIndex = 0;

function openPopup(index) {
    currentImageIndex = index - 1;
    updatePopupContent();
    const popup = document.getElementById('popup');
    popup.classList.add('show');
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('show');
}

function prevImage() {
    currentImageIndex = (currentImageIndex === 0) ? images.length - 1 : currentImageIndex - 1;
    updatePopupContent();
}

function nextImage() {
    currentImageIndex = (currentImageIndex === images.length - 1) ? 0 : currentImageIndex + 1;
    updatePopupContent();
}

function updatePopupContent() {
    document.getElementById('popupImg').src = images[currentImageIndex].src;
    document.getElementById('popupTitle').innerText = images[currentImageIndex].title;
    document.getElementById('popupDescription').innerText = images[currentImageIndex].description;
}

function openExpandedPopup() {
    const expandedPopup = document.getElementById('expandedPopup');
    const expandedImg = document.getElementById('expandedImg');
    expandedImg.src = images[currentImageIndex].src;
    expandedPopup.classList.add('show');
}

function closeExpandedPopup() {
    const expandedPopup = document.getElementById('expandedPopup');
    expandedPopup.classList.remove('show');
}

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


