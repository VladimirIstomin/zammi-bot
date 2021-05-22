const admin = require('firebase-admin');


async function deleteAllAdminRights() {
  const db = admin.firestore();

  const adminsRef = db.collection('admin').doc('admins');

  await adminsRef.set({ids: []});
}


exports.deleteAllAdminRights = deleteAllAdminRights;
