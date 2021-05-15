const admin = require('firebase-admin');


async function deleteAllAdminRights(botContext) {
  const db = admin.firestore();

  const usersRef = db.collection('users');
  const admins = await usersRef.where('type', '==', 'admin').get();

  if (!admins.empty) {
    admins.forEach(async admin => {
      const userRef = db.collection('users').doc(String(admin.id));
      await userRef.update({type: 'user'});
    });
  }

  botContext.admins = [];
}


exports.deleteAllAdminRights = deleteAllAdminRights;
