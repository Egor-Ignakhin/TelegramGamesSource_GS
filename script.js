// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeTelegramWebApp();
    initializePage();
    generateGameCards();
});

// Инициализация Telegram WebApp
function initializeTelegramWebApp() {
    // Проверяем доступность Telegram WebApp API
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        
        // Разворачиваем WebApp на весь экран
        tg.expand();
        
        // Настраиваем цвета под наше приложение
        tg.setHeaderColor('#4A9FD4');
        tg.setBackgroundColor('#4A9FD4');
        
        // Показываем кнопку "Назад"
        tg.BackButton.show();
        
        // Обработчик клика на кнопку "Назад"
        tg.BackButton.onClick(function() {
            // Приоритет закрытия: Game Viewer → Modal → WebApp
            const gameViewer = document.getElementById('gameViewer');
            const modal = document.getElementById('gameModal');
            
            if (gameViewer && gameViewer.classList.contains('active')) {
                // Закрываем игру
                closeGameViewer();
            } else if (modal && modal.classList.contains('active')) {
                // Закрываем модалку
                closeModal();
            } else {
                // Закрываем WebApp (возврат в чат)
                tg.close();
            }
        });
        
        console.log('✅ Telegram WebApp initialized');
    } else {
        console.log('⚠️ Telegram WebApp API not available (running outside Telegram)');
    }
}

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
    
    // Используем изображение, если оно есть, иначе SVG иконку
    const iconContent = game.image 
        ? `<img src="${game.image}" alt="${game.name}" class="game-image" />`
        : `<svg class="game-icon" viewBox="0 0 24 24" fill="currentColor">${iconSVG}</svg>`;
    
    card.innerHTML = `
        <div class="game-icon-wrapper ${game.image ? 'has-image' : ''}">
            ${iconContent}
        </div>
        <h2 class="game-title">${game.name}</h2>
        <button class="play-btn" onclick="openGameModal('${game.id}')">Подробнее</button>
    `;
    
    return card;
}

// Текущая выбранная игра
let currentGame = null;

// Открытие модального окна с информацией об игре
function openGameModal(gameId) {
    const game = PROMO_CONFIG.games.find(g => g.id === gameId);
    
    if (!game) {
        console.error(`Game not found: ${gameId}`);
        return;
    }
    
    currentGame = game;
    
    // Заполняем модальное окно данными игры
    const modal = document.getElementById('gameModal');
    const iconWrapper = document.getElementById('modalIconWrapper');
    const iconEl = document.getElementById('modalIcon');
    const titleEl = document.getElementById('modalTitle');
    const descEl = document.getElementById('modalDescription');
    const tagsEl = document.getElementById('modalTags');
    
    // Устанавливаем цвет и иконку/изображение
    iconWrapper.style.background = game.color;
    
    // Используем изображение, если оно есть, иначе SVG иконку
    if (game.image) {
        iconWrapper.classList.add('has-image');
        iconEl.innerHTML = `<img src="${game.image}" alt="${game.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 16px;" />`;
    } else {
        iconWrapper.classList.remove('has-image');
        const iconSVG = GAME_ICONS[game.icon] || GAME_ICONS.blocks;
        iconEl.innerHTML = `<svg class="modal-icon" viewBox="0 0 24 24" fill="currentColor">${iconSVG}</svg>`;
    }
    
    // Устанавливаем название и описание
    titleEl.textContent = game.name;
    descEl.textContent = game.description || 'Идеально для ритейла и промо-акций. Захватывающий геймплей для ваших клиентов!';
    
    // Устанавливаем теги
    if (game.tags && game.tags.length > 0) {
        tagsEl.innerHTML = game.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('');
    } else {
        tagsEl.innerHTML = `
            <span class="modal-tag">🎮 Казуальная</span>
            <span class="modal-tag">⏱️ 2-5 мин</span>
        `;
    }
    
    // Показываем модальное окно
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Закрытие модального окна
function closeModal() {
    const modal = document.getElementById('gameModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentGame = null;
}

// Переход к игре (открывает в iframe)
function playGame() {
    if (!currentGame) return;
    
    console.log(`Playing game: ${currentGame.name}`);
    
    // Сохраняем URL и название до закрытия модалки
    const gameUrl = currentGame.url;
    const gameName = currentGame.name;
    
    if (gameUrl) {
        closeModal();
        openGameViewer(gameUrl, gameName);
    } else {
        alert(`Ссылка для игры "${gameName}" не настроена`);
    }
}

// Открытие игры в iframe
function openGameViewer(url, title) {
    const viewer = document.getElementById('gameViewer');
    const frame = document.getElementById('gameFrame');
    const titleEl = document.getElementById('gameViewerTitle');
    
    titleEl.textContent = title;
    frame.src = url;
    viewer.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    console.log(`Game viewer opened: ${title}`);
}

// Закрытие game viewer
function closeGameViewer() {
    const viewer = document.getElementById('gameViewer');
    const frame = document.getElementById('gameFrame');
    
    viewer.classList.remove('active');
    document.body.style.overflow = '';
    
    // Полная очистка iframe для освобождения памяти
    setTimeout(() => {
        // Останавливаем все процессы в iframe
        try {
            frame.contentWindow.stop();
        } catch(e) {}
        
        // Очищаем src
        frame.src = 'about:blank';
        
        // Пересоздаем iframe для гарантированной очистки памяти
        // (некоторые браузеры не освобождают память от старого контента)
        setTimeout(() => {
            frame.src = '';
        }, 100);
        
    }, 300);
    
    console.log('Game viewer closed, memory cleaned');
}

// Заявка на игру
function requestGame() {
    if (!currentGame) return;
    
    console.log(`Request game: ${currentGame.name}`);
    
    // Сохраняем данные до закрытия модалки
    const gameId = currentGame.id;
    const gameName = currentGame.name;
    
    // Telegram WebApp API для отправки сообщения
    if (window.Telegram && window.Telegram.WebApp) {
        // Отправляем данные в бот
        window.Telegram.WebApp.sendData(JSON.stringify({
            type: 'game_request',
            gameId: gameId,
            gameName: gameName
        }));
        
        // Показываем уведомление
        window.Telegram.WebApp.showAlert('✅ Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
        closeModal();
    } else {
        // Fallback для тестирования вне Telegram
        const contactLink = PROMO_CONFIG.contactLink || 'https://t.me/your_username';
        const message = encodeURIComponent(`🎮 Хочу игру "${gameName}" для своего бизнеса!`);
        closeModal();
        window.open(`${contactLink}?text=${message}`, '_blank');
    }
}

// Закрытие модалки по клику на оверлей
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('gameModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

// Legacy функция для обратной совместимости
function openGame(gameId) {
    openGameModal(gameId);
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


