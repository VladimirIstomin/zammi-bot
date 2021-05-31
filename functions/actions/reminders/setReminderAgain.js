const { handleNewReminder } = require('./handleNewReminder');

exports.setReminderAgain = async function(reminders, userId, reminderId) {
  let reminderDays;

  for (const reminder of reminders) {
    if (reminder.id === reminderId) {
      reminderDays = reminder.days;
    }

    break;
  }

  return await handleNewReminder(userId, {id: reminderId, days: reminderDays});
}
