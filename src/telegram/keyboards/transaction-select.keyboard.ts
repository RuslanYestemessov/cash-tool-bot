import { ReplyKeyboardMarkup } from 'typegram/callback';

export const transactionSelectKeyboard: ReplyKeyboardMarkup = {
  resize_keyboard: true,
  keyboard: [
    [{ text: 'Доход' }, { text: 'Расход' }],
    [{text: 'Показать все операции'}]
  ]
};
