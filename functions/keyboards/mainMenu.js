const {Markup} = require('telegraf');


exports.mainMenuKeyboard = function() {
  return Markup.keyboard([
    ['О Zammi'],
    ['🌿 Наши растения 🌿'],
    ['🌱 Наши услуги 🌱'],
    ['🌳 Уход за растениями 🌳'],
    ['⏰ Напоминания ⏰']
  ]).resize().extra();
}
