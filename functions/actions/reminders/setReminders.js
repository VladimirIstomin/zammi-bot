const WizardScene = require('telegraf/scenes/wizard');
const constants = require('../../constants');
const {getReminders} = require('./getReminders');
const {mainMenuKeyboard} = require('../../keyboards/mainMenu');
const {handleNewReminders} = require('./handleNewReminders');


exports.setReminders = function() {
  const setRemindersScene = new WizardScene(
    'SET_REMINDERS_SCENE',
    async ctx => {
      const remindersData = await getReminders();

      const remindersText = [];

      for (const reminder of Object.keys(remindersData)) {
        remindersText.push(`${remindersData[reminder].index}. ${remindersData[reminder].text}`);
      }

      ctx.wizard.state['chosenReminders'] = [];
      ctx.wizard.state['allReminders'] = remindersData;


      await ctx.replyWithHTML(remindersText.join('\n'));

      ctx.replyWithHTML(constants.chooseReminders);

      return ctx.wizard.next();
    },
    async ctx => {
      const isSetRemindersCanceled = await handleCancelReminders(ctx);

      let option = ctx.message.text;

      const remindersData = ctx.wizard.state.allReminders;

      if (option === '/confirmReminders' && ctx.wizard.state.chosenReminders.length === 0) {
        ctx.replyWithHTML(constants.noRemindersChosen);
      } else if (option === '/confirmReminders') {
        const res = await handleNewReminders(ctx.update.message.chat.id, ctx.wizard.state.chosenReminders);

        const chosenRemindersNumbers = [];

        for (const reminder of ctx.wizard.state.chosenReminders)
          chosenRemindersNumbers.push(reminder.index);

        if (res && chosenRemindersNumbers.length === 1) {
          await ctx.replyWithHTML(constants.oneReminderSuccess.replace('NUMBER', chosenRemindersNumbers[0]));
        } else if (res && chosenRemindersNumbers.length > 1) {
          await ctx.replyWithHTML(constants.remindersSuccess.replace('NUMBERS', chosenRemindersNumbers.join(', ')));
        } else {
          await ctx.replyWithHTML(constants.remindersFailue);
        }

        backToMainMenu(ctx);
      } else {
        if (!isSetRemindersCanceled) {
          option = +option;

          let reminderToAdd;

          for (const reminder of Object.keys(remindersData)) {
            if (option !== NaN && option === remindersData[reminder].index) {
              reminderToAdd = {index: remindersData[reminder].index, days: remindersData[reminder].days};
            }
          }

          if (reminderToAdd) {
            ctx.wizard.state.chosenReminders.push(reminderToAdd);
          } else {
            ctx.replyWithHTML(constants.wrongReminder);
          }
        }
      }
    }
  )

  return setRemindersScene;
}


async function backToMainMenu(ctx) {
  ctx.replyWithHTML(constants.mainMenu, mainMenuKeyboard());

  return ctx.scene.leave();
}


async function handleCancelReminders(ctx) {
  if (ctx.message.text === '/cancelReminders') {
    await backToMainMenu(ctx);

    return true;
  } else {
    return false;
  }
}