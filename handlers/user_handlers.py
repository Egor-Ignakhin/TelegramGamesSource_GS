from aiogram import types, F, Router
from aiogram.types import Message
from aiogram.filters import Command

from handlers import localization as loc
from handlers import keyboards as kb
router = Router()


@router.message(Command("start"))
async def start(message: Message) -> None:
    await message.answer(text=loc.start_message(message.from_user.first_name), reply_markup=kb.web_app_keyboard())





