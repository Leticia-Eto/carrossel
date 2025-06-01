let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.nav-dot');
const totalSlides = slides.length;

function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function changeSlide(direction) {
    currentSlide += direction;

    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    showSlide(currentSlide);
}

// 1. Inicialize a variável global

// 2. Função para mostrar slide específico
function goToSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    
    // Limite circular (se passar do último, volta ao primeiro)
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
    
    // Atualiza a exibição
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });
}

// 3. Função simplificada para os botões
function change(index) {
    goToSlide(index); // Usa o índice diretamente
}

// 4. Auto-play corrigido
function autoPlay() {
    changeSlide(1); // Avança para próximo slide
}

// 5. Inicialize o carrossel
goToSlide(0); // Mostra primeiro slide ao carregar

// (Opcional) Auto-play periódico
setInterval(autoPlay, 50000); // Troca a cada 5 segundos

// Start auto-play
let autoPlayInterval = setInterval(autoPlay, 50000);

// Pause auto-play on hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(autoPlay, 5000);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Touch/swipe support for mobile
let startX = 0;
let endX = 0;

carouselContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

carouselContainer.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            changeSlide(1); // Swipe left - next slide
        } else {
            changeSlide(-1); // Swipe right - previous slide
        }
    }
}

// Add click handlers for explore buttons
document.querySelectorAll('.explore-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Add your explore functionality here
        const destination = e.target.closest('.carousel-slide').querySelector('.slide-title').textContent;
        alert(`Explorando ${destination}! 🌍`);
    });
});

// Add hover effects and navigation for small images
document.querySelectorAll('.small-image').forEach((img, index) => {
   

    // Add visual feedback on click
    img.addEventListener('mousedown', () => {
        img.style.transform = 'translateY(-5px) scale(0.95)';
    });

    img.addEventListener('mouseup', () => {
        img.style.transform = 'translateY(-10px) scale(1.05)';
    });

    img.addEventListener('mouseleave', () => {
        img.style.transform = '';
    });
});