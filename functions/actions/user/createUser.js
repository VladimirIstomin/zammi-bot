const admin = require('firebase-admin');

async function createUser(userId) {
  console.log('Start creating user') // 0.4s
  try {
    const db = admin.firestore();
  
    data = {
      id: userId,
      type: 'user',
      reminders: [],
    }
  
    await db.collection('users').doc(String(userId)).set(data);
  } catch (e) {
    console.log(e);
  }

  console.log('User has been created');
}

exports.createUser = createUser;
