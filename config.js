// Конфигурация игр для Promo Hub
// Здесь можно легко добавлять, изменять и удалять игры

const PROMO_CONFIG = {
    // Общие настройки
    title: 'Promo Hub',
    subtitle: '10 увлекательных игр доступны',
    footer: 'Промо игры для вашего бизнеса',
    
    // Список игр
    games: [
        {
            id: 'memory',
            name: 'Мемори',
            color: '#F07167',
            icon: 'brain', // brain, blocks, grid
            url: 'https://egor-ignakhin.github.io/MemoryBuild', // Замените на свою ссылку
            // url: './games/memory/index.html', // или относительный путь
        },
        {
            id: 'tetris',
            name: 'Тетрис',
            color: '#6EC6A8',
            icon: 'blocks',
            url: 'https://example.com/tetris',
        },
        {
            id: 'match3',
            name: 'Три в ряд',
            color: '#9DD6C5',
            icon: 'grid',
            url: 'https://example.com/match3',
        },
        {
            id: 'catcher',
            name: 'Кэтчер',
            color: '#FFB84D',
            icon: 'blocks',
            url: 'https://example.com/catcher',
        },
        {
            id: 'quiz',
            name: 'Квиз',
            color: '#A78BFA',
            icon: 'brain',
            url: 'https://example.com/quiz',
        },
        {
            id: 'clicker',
            name: 'Кликер',
            color: '#FB7185',
            icon: 'blocks',
            url: 'https://example.com/clicker',
        },
        {
            id: 'flappy',
            name: 'Флаппи-берд',
            color: '#34D399',
            icon: 'blocks',
            url: 'https://example.com/flappy',
        },
        {
            id: 'doodle',
            name: 'Дудл-джамп',
            color: '#60A5FA',
            icon: 'blocks',
            url: 'https://example.com/doodle',
        },
        {
            id: 'mario',
            name: 'Марио',
            color: '#F87171',
            icon: 'blocks',
            url: 'https://example.com/mario',
        },
        {
            id: 'tower',
            name: 'Башня',
            color: '#FBBF24',
            icon: 'grid',
            url: 'https://example.com/tower',
        },
        
        // Добавьте свои игры здесь:
        // {
        //     id: 'newgame',
        //     name: 'Новая игра',
        //     color: '#FF6B9D',
        //     icon: 'blocks',
        //     url: 'https://example.com/newgame',
        // },
    ]
};

// Иконки для игр (SVG paths)
const GAME_ICONS = {
    brain: '<path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z"/>',
    
    blocks: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H6v-2h4V7h2v4h4v2h-4v4z" transform="rotate(45, 12, 12)"/>',
    
    grid: '<path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/>',
};

