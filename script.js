// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    generateGameCards();
});

// Инициализация заголовков из конфига
function initializePage() {
    document.querySelector('.title').textContent = PROMO_CONFIG.title;
    document.querySelector('.subtitle span').textContent = PROMO_CONFIG.subtitle;
    document.querySelector('.footer p').textContent = PROMO_CONFIG.footer;
    document.title = `${PROMO_CONFIG.title} — Промо игры`;
}

// Генерация карточек игр из конфига
function generateGameCards() {
    const gamesGrid = document.querySelector('.games-grid');
    gamesGrid.innerHTML = ''; // Очищаем существующие карточки
    
    PROMO_CONFIG.games.forEach((game, index) => {
        const card = createGameCard(game, index);
        gamesGrid.appendChild(card);
    });
    
    // Добавляем ripple эффект после создания карточек
    addRippleEffect();
}

// Создание карточки игры
function createGameCard(game, index) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.style.setProperty('--card-color', game.color);
    card.style.setProperty('--card-delay', `${(index + 1) * 0.1}s`);
    
    const iconSVG = GAME_ICONS[game.icon] || GAME_ICONS.blocks;
    
    card.innerHTML = `
        <div class="game-icon-wrapper">
            <svg class="game-icon" viewBox="0 0 24 24" fill="currentColor">
                ${iconSVG}
            </svg>
        </div>
        <h2 class="game-title">${game.name}</h2>
        <button class="play-btn" onclick="openGame('${game.id}')">Играть</button>
    `;
    
    return card;
}

// Открытие игры
function openGame(gameId) {
    const game = PROMO_CONFIG.games.find(g => g.id === gameId);
    
    if (!game) {
        console.error(`Game not found: ${gameId}`);
        return;
    }
    
    console.log(`Opening game: ${game.name}`);
    
    // Открываем игру по ссылке из конфига
    if (game.url) {
        window.location.href = game.url;
        // Или открыть в новой вкладке:
        // window.open(game.url, '_blank');
    } else {
        alert(`Ссылка для игры "${game.name}" не настроена в конфиге`);
    }
}

// Добавление ripple эффекта к кнопкам
function addRippleEffect() {
    document.querySelectorAll('.play-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
    });
}

// Add ripple animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations (if page becomes scrollable)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe game cards for future scroll animations
document.querySelectorAll('.game-card').forEach(card => {
    observer.observe(card);
});


