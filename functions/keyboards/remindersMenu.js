const {Markup} = require('telegraf');


exports.remindersMenuKeyboard = function() {
  return Markup.keyboard([
    ['📌 Установить напоминания'],
    ['🚫 Удалить все напоминания'],
    ['🔙 В главное меню']
  ]).resize().extra();
}
