const admin = require('firebase-admin');

async function checkUserExists(userId) {
  console.log('Start checking user exists'); // 3.8s
  
  console.log('connecting to firestore');
  const db = admin.firestore();
  console.log('connected');

  const userRef = db.collection('users').doc(String(userId));

  console.log('getting user');
  const user = await userRef.get();
  console.log('user gotten');

  console.log('Finish checking user for existence');

  return user.exists;
}


exports.checkUserExists = checkUserExists;
