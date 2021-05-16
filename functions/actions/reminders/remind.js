const admin = require('firebase-admin');
const {convertDate} = require('./convertDate');
const {getReminders} = require('./getReminders');
const {telegramAPITimer} = require('../timer/telegramAPITimer');
const {deleteReminder} = require('./deleteReminder');
const {completeActionKeyboard} = require('../../keyboards/completeAction');


exports.remind = async function(bot) {
  try {
    const db = admin.firestore();

    let today = Date.now();
    today = convertDate(today);

    const reminders = getReminders();

    const usersRef = db.collection('users').where('reminders', '!=', []);
    const usersWithReminders = await usersRef.get();
    const userWithRemindersArray = [];

    if (!usersWithReminders.empty) {
      usersWithReminders.forEach(user => userWithRemindersArray.push(user));
    }

    for (const user of userWithRemindersArray) {
      const userReminders = user.data().reminders;

      for (const reminder of userReminders) {
        if (reminder.dateToRemind === today) {
          try {
            console.log(completeActionKeyboard(reminder.index));
            bot.telegram.sendMessage(
              user.id,
              reminders[String(reminder.index)].reminderText,
              completeActionKeyboard(reminder.index)
            ); // change index with some id
            
            const res = await deleteReminder(user.id, reminder);

            if (!res) {
              throw new Error(`The reminder with index ${reminder.index} of user with id ${user.id} wasn't deleted`);
            }

          } catch (e) {
            console.log(e);
            throw new Error(`Unable to send message to user with id ${user.id}`);
          }
        }

        await telegramAPITimer();
      }
    }

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
