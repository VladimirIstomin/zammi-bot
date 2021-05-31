const { Markup } = require('telegraf');
const constants = require('../constants');


exports.remindersMenuKeyboard = function() {
  return Markup.keyboard([
    [constants.setRemindersButton],
    [constants.deleteAllRemindersButton],
    [constants.backToMainMenuButton]
  ]).resize().extra();
}
