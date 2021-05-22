const {Markup, Extra} = require('telegraf');
const constants = require('../constants');


exports.completeActionKeyboard = function(reminderId) {
  const actionCompleted = Markup.callbackButton(constants.actionCompletedButton, `comp_${reminderId}`);

  const keyboard = Extra.markup(Markup.inlineKeyboard([actionCompleted]));

  return keyboard;
}
