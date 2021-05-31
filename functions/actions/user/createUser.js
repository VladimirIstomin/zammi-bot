const admin = require('firebase-admin');

exports.createUser = async function(userId) {
  try {
    const db = admin.firestore();
  
    data = {
      id: userId,
      reminders: [],
    }
  
    await db.collection('users').doc(String(userId)).set(data);
  } catch (e) {
    console.log(e);
  }
}
