const admin = require('firebase-admin');

async function createUser(userId) {
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

exports.createUser = createUser;
