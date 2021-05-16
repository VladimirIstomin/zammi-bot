const {Markup, Extra} = require('telegraf');
const constants = require('../constants');


exports.mainMenuKeyboard = function() {
  const button = Markup.urlButton(constants.goToWebsite, constants.websiteUrl);

  const keyboard = Extra.markup(Markup.inlineKeyboard([button]));

  return keyboard;
}
