# 🤖 Интеграция с Telegram Bot

## Быстрый старт

### 1️⃣ Создайте бота

Напишите [@BotFather](https://t.me/BotFather):

```
/newbot
```

Придумайте название и username для бота.

---

### 2️⃣ Настройте WebApp

Отправьте @BotFather:

```
/newapp
```

Выберите своего бота и укажите:
- **Web App URL**: Адрес вашего сайта (например, GitHub Pages URL)
- **Title**: Promo Hub
- **Description**: Каталог промо-игр для бизнеса
- **Photo**: 640x360px (опционально)

---

### 3️⃣ Добавьте кнопку открытия каталога

#### Python (aiogram 3.x)

```python
from aiogram import Bot, Dispatcher, F
from aiogram.types import Message, WebAppInfo
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
import json

# Кнопка для открытия каталога
@dp.message(F.text == "/start")
async def start_handler(message: Message):
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(
            text="🎮 Открыть каталог игр",
            web_app=WebAppInfo(url="https://your-username.github.io/promo-hub/")
        )]
    ])
    
    await message.answer(
        "🎯 Добро пожаловать в Promo Hub!\n\n"
        "Каталог промо-игр для вашего бизнеса.\n"
        "Выберите игру и протестируйте прямо сейчас:",
        reply_markup=keyboard
    )

# Обработка заявок от кнопки "Хочу такую"
@dp.message(F.web_app_data)
async def web_app_data_handler(message: Message):
    try:
        data = json.loads(message.web_app_data.data)
        
        if data.get('type') == 'game_request':
            game_name = data.get('gameName')
            game_id = data.get('gameId')
            user = message.from_user
            
            # Уведомление администратору
            await bot.send_message(
                ADMIN_ID,  # Укажите ваш Telegram ID
                f"🎮 <b>Новая заявка на игру!</b>\n\n"
                f"🎯 Игра: <b>{game_name}</b>\n"
                f"🆔 ID: <code>{game_id}</code>\n\n"
                f"👤 От: {user.full_name}\n"
                f"📱 Username: @{user.username or 'не указан'}\n"
                f"🔢 User ID: <code>{user.id}</code>",
                parse_mode="HTML"
            )
            
            # Подтверждение пользователю
            await message.answer(
                "✅ <b>Ваша заявка отправлена!</b>\n\n"
                "Мы свяжемся с вами в ближайшее время.\n"
                "Спасибо за интерес! 🚀",
                parse_mode="HTML"
            )
    except Exception as e:
        print(f"Error handling web_app_data: {e}")
        await message.answer("Произошла ошибка. Попробуйте снова.")
```

#### Node.js (telegraf)

```javascript
const { Telegraf } = require('telegraf');

const bot = new Telegraf('YOUR_BOT_TOKEN');

bot.start((ctx) => {
  ctx.reply('🎯 Добро пожаловать в Promo Hub!', {
    reply_markup: {
      inline_keyboard: [[
        {
          text: '🎮 Открыть каталог игр',
          web_app: { url: 'https://your-username.github.io/promo-hub/' }
        }
      ]]
    }
  });
});

bot.on('web_app_data', (ctx) => {
  const data = JSON.parse(ctx.webAppData.data);
  
  if (data.type === 'game_request') {
    // Отправляем уведомление админу
    bot.telegram.sendMessage(
      ADMIN_ID,
      `🎮 Новая заявка на игру!\n\n` +
      `Игра: ${data.gameName}\n` +
      `От: ${ctx.from.first_name} @${ctx.from.username}`
    );
    
    ctx.reply('✅ Ваша заявка отправлена!');
  }
});

bot.launch();
```

---

### 4️⃣ Деплой на GitHub Pages (бесплатно)

```bash
# Создайте репозиторий на GitHub
# Загрузите код
git init
git add .
git commit -m "Initial commit: Promo Hub"
git remote add origin https://github.com/your-username/promo-hub.git
git push -u origin main

# Включите GitHub Pages в настройках репозитория:
# Settings → Pages → Source: main branch → Save
```

Ваш каталог будет доступен по адресу:  
`https://your-username.github.io/promo-hub/`

---

## 🔙 Как работает кнопка "Назад"

При открытии в Telegram автоматически:

1. **Разворачивается на весь экран** - `Telegram.WebApp.expand()`
2. **Показывается кнопка "Назад"** в левом верхнем углу Telegram
3. **При клике на "Назад"**:
   - Если открыта модалка → закрывает модалку
   - Если модалка закрыта → закрывает WebApp (возврат в чат)

### Тестирование вне Telegram

- При открытии в обычном браузере WebApp API недоступен
- Fallback: кнопка "Хочу такую" → открывает `t.me/username?text=...`
- В консоли: `⚠️ Telegram WebApp API not available`

---

## ⚙️ Настройка в config.js

```javascript
const PROMO_CONFIG = {
    // Ваш Telegram username для заявок (БЕЗ @)
    contactLink: 'https://t.me/EgorIgnakhin',
    
    // Список игр...
    games: [...]
};
```

---

## 📱 Тестирование

1. Отправьте команду `/start` вашему боту
2. Нажмите кнопку "🎮 Открыть каталог игр"
3. Проверьте:
   - ✅ Кнопка "Назад" в Telegram
   - ✅ Открытие модалки с описанием игры
   - ✅ Кнопка "Играть" переходит на игру
   - ✅ Кнопка "Хочу такую" отправляет заявку

---

## 🎨 Кастомизация цветов Telegram

В `script.js`:

```javascript
tg.setHeaderColor('#4A9FD4');      // Цвет шапки
tg.setBackgroundColor('#4A9FD4');  // Цвет фона
```

---

## 📞 Поддержка

- Telegram: [@EgorIgnakhin](https://t.me/EgorIgnakhin)
- Сайт: game-solutions.ru
