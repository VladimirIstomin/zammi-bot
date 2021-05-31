const { Markup } = require('telegraf');
const constants = require('../constants');


exports.mainMenuKeyboard = function() {
  return Markup.keyboard([
    [constants.aboutButton],
    [constants.ourPlantsButton],
    [constants.ourServicesButton],
    [constants.plantCareButton],
    [constants.remindersButton]
  ]).resize().extra();
}
