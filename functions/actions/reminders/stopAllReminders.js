const admin = require('firebase-admin');

exports.stopAllReminders = async function(userId) {
  const db = admin.firestore();

  const userRef = db.collection('users').doc(String(userId));
  
  const res = await userRef.update({reminders: []});

  return res;
}
