const WizardScene = require('telegraf/scenes/wizard');
const constants = require('../../../constants');
const {mainMenuKeyboard} = require('../../../keyboards/mainMenu');
const {handleNewAdminPassword} = require('./handleNewAdminPassword');


exports.setAdminPassword = function() {
  const setAdminPasswordScene = new WizardScene(
    'SET_ADMIN_PASSWORD_SCENE',
    async ctx => {
      const admins = ctx.wizard.state.admins;

      if (admins.includes(ctx.update.message.chat.id)) {
        ctx.replyWithHTML(constants.requestNewPassword);

        return ctx.wizard.next();

      } else {
        ctx.replyWithHTML(constants.unauthorizedAccess);

        ctx.replyWithHTML(constants.mainMenu, mainMenuKeyboard());

        return ctx.scene.leave();
      }
    },
    async ctx => {
      ctx.deleteMessage();
      
      if (handleNewAdminPassword(ctx)) {
        await ctx.replyWithHTML(constants.newPasswordSuccess);
      } else {
        await ctx.replyWithHTML(constants.newPasswordFailure);
      }

      ctx.replyWithHTML(constants.mainMenu, mainMenuKeyboard());
      
      return ctx.scene.leave();
    }
  );

  return setAdminPasswordScene;
}
