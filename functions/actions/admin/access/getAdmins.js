const admin = require('firebase-admin');


async function getAdmins(botContext) {
  const db = admin.firestore();

  const adminsRef = db.collection('users');
  const admins = await adminsRef.where('type', '==', 'admin').get();

  const adminsList = [];

  if (!admins.empty) {
    admins.forEach(admin => {
      adminsList.push(+admin.id);
    });
  }

  botContext.admins = adminsList;
  
  return adminsList;
}


exports.getAdmins = getAdmins;
