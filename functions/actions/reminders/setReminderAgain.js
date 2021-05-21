const {handleNewReminder} = require('./handleNewReminder');

exports.setReminderAgain = async function(reminders, userId, reminderId) {
  let reminderDays;

  reminders.forEach(reminder => {
    if (reminder.id === reminderId) {
      reminderDays = reminder.days;
    }
  });

  return await handleNewReminder(userId, {id: reminderId, days: reminderDays});
}
