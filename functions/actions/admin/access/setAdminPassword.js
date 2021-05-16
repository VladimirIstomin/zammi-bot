const WizardScene = require('telegraf/scenes/wizard');
const constants = require('../../../constants');
const {mainMenuKeyboard} = require('../../../keyboards/mainMenu');
const {handleNewAdminPassword} = require('./handleNewAdminPassword');
const {getAdmins} = require('./getAdmins');


exports.setAdminPassword = function(botContext) {
  const setAdminPasswordScene = new WizardScene(
    'SET_ADMIN_PASSWORD_SCENE',
    async ctx => {
      if (botContext.admins.length === 0) {
        await getAdmins(botContext);
      }

      if (botContext.admins.includes(ctx.update.message.chat.id)) {
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
      
      if (handleNewAdminPassword(ctx, botContext)) {
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
