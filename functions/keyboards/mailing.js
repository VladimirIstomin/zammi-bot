const {Markup, Extra} = require('telegraf');
const constants = require('../constants');


exports.mailingKeyboard = function() {
  const approve = Markup.callbackButton(constants.approveMailingButton, 'approve_mailing');
  const disapprove = Markup.callbackButton(constants.disapproveMailingButton, 'disapprove_mailing');

  const keyboard = Extra.markup(Markup.inlineKeyboard([approve, disapprove]));

  return keyboard;
}
