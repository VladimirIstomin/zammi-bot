const {Markup, Extra} = require('telegraf');
const constants = require('../constants');


exports.repeatReminderKeyboard = function(reminderId) {
  const repeatReminder = Markup.callbackButton(constants.repeatReminderButton, `rep_${reminderId}`);

  keyboard = Extra.markup(Markup.inlineKeyboard([repeatReminder]));

  return keyboard;
}
