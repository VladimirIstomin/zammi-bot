const admin = require('firebase-admin');
const bcrypt = require('bcrypt');


exports.checkAdminPassword = async function(adminPassword) {
  try {
    const db = admin.firestore();

    const passwordRef = db.collection('admin').doc('password');
    let password = await passwordRef.get();
    password = password.data().password;

    let result = await bcrypt.compare(adminPassword, password);

    return result;
  } catch (e) {
    console.log(e);
  }
}
