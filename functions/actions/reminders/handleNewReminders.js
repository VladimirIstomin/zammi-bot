const {convertDate} = require('./convertDate');
const admin = require('firebase-admin');

exports.handleNewReminders = async function(userId, reminders) {
  try {
    const db = admin.firestore();

    const userRef = db.collection('users').doc(String(userId));

    const currentDate = Date.now();

    const newReminders = [];

    reminders.forEach(reminder => {
      let dateToRemind = new Date(currentDate);
      dateToRemind = dateToRemind.setDate(dateToRemind.getDate() + reminder.days);
      dateToRemind = convertDate(dateToRemind);
      
      newReminders.push({
        index: reminder.index,
        dateToRemind
      });
    });

    await userRef.update({
      reminders: admin.firestore.FieldValue.arrayUnion(...newReminders)
    });
    
    return true
  } catch (e) {
    console.log(e);
    return false;
  }
}
