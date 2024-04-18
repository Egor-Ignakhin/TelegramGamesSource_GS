import aiohttp

from aiogram.types import InlineKeyboardButton, KeyboardButton, ReplyKeyboardMarkup, InlineKeyboardMarkup
from aiogram.types.web_app_info import WebAppInfo


def web_app_keyboard() -> ReplyKeyboardMarkup:
    buttons = [
        [
            KeyboardButton(text='Все игры 🎲', web_app=WebAppInfo(url="https://kurochki-n.github.io/Portfolio-Page/")),
        ]
    ]
    keyboard = ReplyKeyboardMarkup(keyboard=buttons, resize_keyboard=True)
    return keyboard

