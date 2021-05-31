const admin = require('firebase-admin');

exports.checkUserExists = async function(userId) {
  const db = admin.firestore();

  const userRef = db.collection('users').doc(String(userId));

  const user = await userRef.get();

  return user.exists;
}
