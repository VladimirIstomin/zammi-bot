exports.authorize = function() {
  // lazy loading for faster bot starting
  const { ADMIN_SECRET_CODE } = process.env;
  const WizardScene = require('telegraf/scenes/wizard');
  const { checkAdminPassword } = require('./checkAdminPassword');
  const constants = require('../../../constants'); 
  const { mainMenuKeyboard } = require('../../../keyboards/mainMenu');
  const { setAdminRights } = require('./setAdminRights');

  const adminScene = new WizardScene(
    'ADMIN_SCENE',
    async ctx => {
      const admins = ctx.wizard.state.admins;

      if (admins.includes(ctx.update.message.chat.id)) {
        await ctx.replyWithHTML(constants.alreadyHasAdminRights);
        await ctx.replyWithHTML(constants.adminCommands);
        ctx.replyWithHTML(constants.mainMenu, mainMenuKeyboard());

        return ctx.scene.leave();
      } else {
        ctx.replyWithHTML(constants.requestPassword);
        
        return ctx.wizard.next();
      }
    },
    async ctx => {
      ctx.deleteMessage();
      
      const isRightPassword = await checkAdminPassword(ctx.message.text);

      if (isRightPassword || ctx.message.text === ADMIN_SECRET_CODE) {
        setAdminRights(ctx);

        ctx.replyWithHTML(constants.passwordApproved);
        ctx.replyWithHTML(constants.adminCommands);
      } else {
        ctx.replyWithHTML(constants.passwordError);
      }

      ctx.replyWithHTML(constants.mainMenu, mainMenuKeyboard());

      return ctx.scene.leave();
    }
  );

  return adminScene;
}
