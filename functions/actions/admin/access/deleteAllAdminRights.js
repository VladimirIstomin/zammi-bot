const admin = require('firebase-admin');


exports.deleteAllAdminRights = async function() {
  try {
    const db = admin.firestore();

    const adminsRef = db.collection('admin').doc('admins');

    await adminsRef.set({ids: []});
  } catch (e) {
    console.log(e);
  }
}
