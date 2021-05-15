const {Markup, Extra} = require('telegraf');
const constants = require('../constants');


exports.mailingKeyboard = function() {
  approve = Markup.callbackButton(constants.approveMailingButton, 'approve_mailing');
  disapprove = Markup.callbackButton(constants.disapproveMailingButton, 'disapprove_mailing');

  keyboard = Extra.markup(Markup.inlineKeyboard([approve, disapprove]));

  return keyboard;
}
