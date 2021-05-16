exports.getReminders = function() {
  return {
    "1": {
      index: 1,
      text: 'Напомнить о поливе растений через 7 дней',
      days: 7,
      reminderText: 'Привет! Пришло время полить растения'
    },
    "2": {
      index: 2,
      text: 'Напомнить о поливе растений через 5 дней',
      days: 5,
      reminderText: 'Привет! 5 дней прошло, пора полить растения'
    }
  }
}
