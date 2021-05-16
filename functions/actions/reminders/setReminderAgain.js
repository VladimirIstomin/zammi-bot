const {getReminders} = require('./getReminders');
const {handleNewReminders} = require('./handleNewReminders');

exports.setReminderAgain = async function(userId, reminderIndex) {
  const remindersAll = getReminders();

  let reminderDays;

  Object.keys(remindersAll).forEach(reminderKey => {
    if (remindersAll[reminderKey].index === reminderIndex) {
      reminderDays = remindersAll[reminderKey].days;
    }
  });

  return await handleNewReminders(userId, [{index: reminderIndex, days: reminderDays}]);
}
