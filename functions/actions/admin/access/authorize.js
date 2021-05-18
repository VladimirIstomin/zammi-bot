exports.authorize = function(botContext) {
  const {ADMIN_SECRET_CODE} = process.env;
  const WizardScene = require('telegraf/scenes/wizard');
  const {checkAdminPassword} = require('./checkAdminPassword');
  const constants = require('../../../constants'); 
  const {mainMenuKeyboard} = require('../../../keyboards/mainMenu');
  const {setAdminRights} = require('./setAdminRights');
  const {getAdmins} = require('./getAdmins');

  const adminScene = new WizardScene(
    'ADMIN_SCENE',
    async ctx => {
      if (botContext.admins.length === 0) {
        await getAdmins(botContext);
      }

      if (botContext.admins.includes(ctx.update.message.chat.id)) {
        ctx.replyWithHTML(constants.alreadyHasAdminRights);

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
      
      console.log(isRightPassword);

      if (isRightPassword || ctx.message.text === ADMIN_SECRET_CODE) {
        setAdminRights(ctx, botContext);

        ctx.replyWithHTML(constants.passwordApproved)
      } else {
        ctx.replyWithHTML(constants.passwordError);
      }

      ctx.replyWithHTML(constants.mainMenu, mainMenuKeyboard());

      return ctx.scene.leave();
    }
  );

  return adminScene;
}
