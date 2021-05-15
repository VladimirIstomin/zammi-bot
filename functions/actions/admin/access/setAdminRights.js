const admin = require('firebase-admin');


async function setAdminRights(ctx, botContext) {
  try {
    const db = admin.firestore();

    if ('admins' in botContext) {
      botContext.admins.push(ctx.update.message.chat.id);
    } else {
      botContext['admins'] = [ctx.update.message.chat.id];
    }

    const userRef = db.collection('users').doc(String(ctx.update.message.chat.id));
    await userRef.update({type: 'admin'});
  } catch (e) {
    console.log(e);
  }
}


exports.setAdminRights = setAdminRights;
