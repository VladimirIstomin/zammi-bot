const {Markup, Extra} = require('telegraf');
const constants = require('../constants');


exports.completeActionKeyboard = function(reminderIndex) {
  const actionCompleted = Markup.callbackButton(constants.actionCompleted, `completed_${reminderIndex}`);

  const keyboard = Extra.markup(Markup.inlineKeyboard([actionCompleted]));

  return keyboard;
}
