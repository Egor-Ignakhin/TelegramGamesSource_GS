import aiohttp
import json

from aiogram import types, F, Router
from aiogram.types import Message
from aiogram.filters import Command, Filter

from handlers import localization as loc
from handlers import keyboards as kb
import data.config as config
router = Router()


async def send_message(text):
    url = 'https://api.telegram.org/bot' + config.BOT_TOKEN + '/sendMessage?chat_id=' + config.CHAT_ID + '&text=' + text
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            ...

class WebAppDataFilter(Filter):
    async def __call__(self, message: Message, **kwargs):
        return dict(web_app_data=message.web_app_data) if message.web_app_data else False

@router.message(Command("start"))
async def start(message: Message) -> None:
    await message.answer(text=loc.start_message(message.from_user.first_name), reply_markup=kb.web_app_keyboard())

@router.message(WebAppDataFilter()) #получаем отправленные данные 
async def answer(message: types.Message):
   data = json.loads(message.web_app_data.data)

   text = '''
    Пришёл новый заказ%0A
    %0A
    Цена:%0A
    * От: {}%0A
    * До: {}%0A
    %0A
    Сроки:%0A
    * От: {}%0A
    * До: {}%0A
    %0A
    Контактные данные:%0A
    * Имя: {}%0A
    * Телеграм: {}%0A
    * Почта: {}%0A
    %0A
    Информация:%0A
    * Задача игры: {}%0A
    * Описание: {}%0A
    * Аудитория: {}%0A
    * Графика: {}%0A
    * Стилистика: {}%0A
    * Планируется ли онлайн-составляющая*: {}%0A
    * Доп. сервисы: {}%0A
    * Наработки: {}%0A
    * Приоритеты: {}%0A
    * Критически важные и приоритетные вещи: {}%0A
    * Другое: {}
    '''.format(data['minPrice'], data['maxPrice'], data['minDays'],
               data['maxDays'], data['name'], data['telegram'], 
               data['email'], data['taskOfGame'], data['shortDescription'],
               data['gameAudience'], data['graphicsType'], data['gameStyle'],
               data['isOnline'], data['otherServices'], data['hasDevelopments'],
               data['priorities'], data['importantThings'], data['otherThings']
               )
   await send_message(text)
   