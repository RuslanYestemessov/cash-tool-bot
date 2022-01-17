import { ReplyKeyboardMarkup } from 'typegram/callback';

export const helloKeyboard: ReplyKeyboardMarkup = {
  resize_keyboard: true,
  keyboard: [
    [{ text: 'Авторизация по номеру', request_contact: true }]
  ]
};
