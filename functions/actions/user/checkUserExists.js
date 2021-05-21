const admin = require('firebase-admin');

async function checkUserExists(userId) {
  const db = admin.firestore();

  const userRef = db.collection('users').doc(String(userId));

  const user = await userRef.get();

  return user.exists;
}


exports.checkUserExists = checkUserExists;
