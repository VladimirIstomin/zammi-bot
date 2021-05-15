const {Markup, Extra} = require('telegraf');
const constants = require('../constants');


exports.mainMenuKeyboard = function() {
  button = Markup.urlButton(constants.goToWebsite, constants.websiteUrl);

  keyboard = Extra.markup(Markup.inlineKeyboard([button]));

  return keyboard;
}
