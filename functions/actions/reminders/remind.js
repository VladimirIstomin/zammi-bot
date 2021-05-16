const admin = require('firebase-admin');
const {convertDate} = require('./convertDate');
const {getReminders} = require('./getReminders');
const {telegramAPITimer} = require('../timer/telegramAPITimer');


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
            bot.telegram.sendMessage(user.id, reminders[String(reminder.index)].reminderText); // change index with some id
          } catch (e) {
            console.log(e);
            throw new Error(`Unable to send message to user with id ${user.id}`);
          }
        }

        // and we need to delete this reminder from db;

        await telegramAPITimer();
      }
    }

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
