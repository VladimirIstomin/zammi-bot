const {Markup, Extra} = require('telegraf');
const constants = require('../constants');


exports.repeatReminderKeyboard = function(reminderIndex) {
  const repeatReminder = Markup.callbackButton(constants.repeatReminder, `repeatReminder_${reminderIndex}`);

  keyboard = Extra.markup(Markup.inlineKeyboard([repeatReminder]));

  return keyboard;
}
