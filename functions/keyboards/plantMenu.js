const {Markup} = require('telegraf');


exports.plantMenuKeyboard = function(plants) {
  const plantsButtons = plants.map(plant => [plant.name]);

  plantsButtons.push(['🔙 В главное меню']);
  
  return Markup.keyboard(plantsButtons).resize().extra();
}
