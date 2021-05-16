const WizardScene = require('telegraf/scenes/wizard');
const constants = require('../../../constants');
const {getAdmins} = require('../access/getAdmins');
const {mailingKeyboard} = require('../../../keyboards/mailing');
const {mainMenuKeyboard} = require('../../../keyboards/mainMenu');
const {sendMailing} = require('./sendMailing');


exports.createMailing = function(botContext) {
  const createMailingScene = new WizardScene(
    'CREATE_MAILING_SCENE',
    async ctx => {
      if (botContext.admins.length === 0) {
        await getAdmins(botContext);
      }

      if (botContext.admins.includes(ctx.update.message.chat.id)) {
        ctx.replyWithHTML(constants.requestMailingText);

        return ctx.wizard.next();

      } else {
        ctx.replyWithHTML(constants.unauthorizedAccess);

        return backToMainMenu(ctx);
      }
    },
    async ctx => {
      const isMailingCreationStopped = await handleStopMailing(ctx);

      if (!isMailingCreationStopped) {
        ctx.wizard.state['text'] = ctx.message.text;

        ctx.replyWithHTML(constants.requestMailingImage);

        return ctx.wizard.next();
      }
    },
    async ctx => {
      const isMailingCreationStopped = await handleStopMailing(ctx);

      if (!isMailingCreationStopped) {
        await ctx.replyWithHTML(constants.mailingPreview);

        if (ctx.updateSubTypes[0] === 'photo') {
          ctx.wizard.state['photo'] = ctx.message.photo[2].file_id;
          await ctx.replyWithPhoto(ctx.wizard.state.photo, {caption: ctx.wizard.state.text, parse_mode: 'HTML'});
        } else {
          await ctx.replyWithHTML(ctx.wizard.state.text);
        }

        ctx.replyWithHTML(constants.approveAndSendMailing, mailingKeyboard());

        return ctx.wizard.next();
      }
    },
    async ctx => {
      let isMailingCreationStopped = false;

      if (ctx.updateType === 'message') {
        isMailingCreationStopped = await handleStopMailing(ctx);
      }

      if (!isMailingCreationStopped && ctx.updateType === 'message') {
        ctx.replyWithHTML(constants.requestButtonPress);
      } else if (!isMailingCreationStopped && ctx.update.callback_query.data === 'approve_mailing') {
        ctx.replyWithHTML(constants.mailingStarted);
        
        const result = await sendMailing(ctx);

        if (result) {
          await ctx.replyWithHTML(constants.mailingSuccess);
        } else {
          await ctx.replyWithHTML(constants.mailingFailure);
        }

        return backToMainMenu(ctx);
      } else if (!isMailingCreationStopped && ctx.update.callback_query.data === 'disapprove_mailing') {
        return backToMainMenu(ctx);
      }
    }
  );

  return createMailingScene
}


function backToMainMenu(ctx) {
  ctx.replyWithHTML(constants.mainMenu, mainMenuKeyboard());

  return ctx.scene.leave();
}


function handleStopMailing(ctx) {
  if (ctx.message.text === '/stopMailing') {
    backToMainMenu(ctx);

    return true;
  } else {
    return false;
  }
}
