const admin = require('firebase-admin');


async function setAdminRights(ctx) {
  try {
    const db = admin.firestore();

    const adminsRef = db.collection('admin').doc('admins');
    await adminsRef.update({ids: admin.firestore.FieldValue.arrayUnion(ctx.update.message.chat.id)});
  } catch (e) {
    console.log(e);
  }
}


exports.setAdminRights = setAdminRights;
