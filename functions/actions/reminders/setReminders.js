const WizardScene = require('telegraf/scenes/wizard');
const constants = require('../../constants');
const { mainMenuKeyboard } = require('../../keyboards/mainMenu');
const { handleNewReminder } = require('./handleNewReminder');
const { plantMenuKeyboard } = require('../../keyboards/plantMenu');


exports.setReminders = function() {
  const setRemindersScene = new WizardScene(
    'SET_REMINDERS_SCENE',
    async ctx => {
      ctx.replyWithHTML(constants.setRemindersMenu, plantMenuKeyboard(ctx.wizard.state.reminders));

      return ctx.wizard.next();
    },
    async ctx => {
      let option = ctx.message.text;

      if (option === constants.backToMainMenuButton) {
        ctx.replyWithHTML(constants.mainMenu, mainMenuKeyboard());

        return ctx.scene.leave();
      } else {
        for (const reminder of ctx.wizard.state.reminders) {
          if (reminder.name === option) {
            const res = await handleNewReminder(ctx.update.message.chat.id, {
              id: reminder.id,
              days: reminder.days
            });

            if (res) {
              ctx.replyWithHTML(reminder.reminderSet);
            } else {
              ctx.replyWithHTML(constants.reminderFailue);
            }

            break;
          }
        }
      }
    }
  )

  return setRemindersScene;
}
