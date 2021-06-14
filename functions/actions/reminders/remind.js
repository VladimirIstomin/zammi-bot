const admin = require('firebase-admin');
const { convertDate } = require('./convertDate');
const { telegramAPITimer } = require('../timer/telegramAPITimer');
const { deleteReminder } = require('./deleteReminder');
const { completeActionKeyboard } = require('../../keyboards/completeAction');


exports.remind = async function(bot, reminders) {
  try {
    const db = admin.firestore();

    let today = Date.now();
    today = convertDate(today);

    const usersRef = db.collection('users').where('reminders', '!=', []);
    const usersWithRemindersFirestoreObject = await usersRef.get();

    const userWithReminders = [];

    if (!usersWithRemindersFirestoreObject.empty) {
      usersWithRemindersFirestoreObject.forEach(user => userWithReminders.push(user.data()));
    }
    
    for (const user of userWithReminders) {
      const userReminders = user.reminders;

      for (const userReminder of userReminders) {
        if (userReminder.dateToRemind === today) {
          try {
            let reminderText;

            for (let reminder of reminders) {
              if (reminder.id === userReminder.id) {
                reminderText = reminder.reminderText;
                break;
              }
            }

            if (reminderText !== undefined) {
                bot.telegram.sendMessage(
                user.id,
                reminderText,
                completeActionKeyboard(userReminder.id)
              );
            }

            const res = await deleteReminder(user.id, userReminder);

            if (!res) {
              console.log(`Send reminder error: The reminder with id ${userReminder.id} of user with id ${user.id} wasn't deleted`);
            }

          } catch (e) {
            console.log(e);
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
