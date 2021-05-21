const {convertDate} = require('./convertDate');
const admin = require('firebase-admin');

exports.handleNewReminder = async function(userId, reminder) {
  try {
    const db = admin.firestore();

    const userRef = db.collection('users').doc(String(userId));

    const currentDate = Date.now();

    let dateToRemind = new Date(currentDate);
    dateToRemind = dateToRemind.setDate(dateToRemind.getDate() + reminder.days);
    dateToRemind = convertDate(dateToRemind);

    const newReminder = {
      id: reminder.id,
      dateToRemind
    }

    await userRef.update({
      reminders: admin.firestore.FieldValue.arrayUnion(newReminder)
    });
    
    return true
  } catch (e) {
    console.log(e);
    return false;
  }
}
