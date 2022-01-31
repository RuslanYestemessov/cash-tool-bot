import { ReplyKeyboardMarkup } from 'typegram/callback';

export const transactionSelectKeyboard: ReplyKeyboardMarkup = {
  resize_keyboard: true,
  one_time_keyboard: true,
  keyboard: [
    [{ text: 'Доход' }, { text: 'Расход' }]
  ]
};
