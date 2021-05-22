const {Markup} = require('telegraf');
const constants = require('../constants');


exports.plantMenuKeyboard = function(plants) {
  const plantsButtons = plants.map(plant => [plant.name]);

  plantsButtons.push([constants.backToMainMenuButton]);
  
  return Markup.keyboard(plantsButtons).resize().extra();
}
