const admin = require('firebase-admin');


exports.deleteReminder = async function(userId, reminder) {
  try {
    const db = admin.firestore();

    const userRef = db.collection('users').doc(String(userId));

    await userRef.update({
      reminders: admin.firestore.FieldValue.arrayRemove(reminder)
    });

    return true
  } catch (e) {
    console.log(e);
    
    return false;
  }
}
