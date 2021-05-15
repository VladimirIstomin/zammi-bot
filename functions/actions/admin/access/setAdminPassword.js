const admin = require('firebase-admin');
const {deleteAllAdminRights} = require('./deleteAllAdminRights.js');
const bcrypt = require('bcrypt');


exports.setAdminPassword = function(ctx, botContext) {
  try {
    const saltRounds = 10;

    const db = admin.firestore();
    const passwordRef = db.collection('admin').doc('password');

    bcrypt.hash(ctx.message.text, saltRounds, async (err, hash) => {
      if (err) {
        return false;
      }

      await passwordRef.update({
        password: hash
      });

      return true;
    });
    
    deleteAllAdminRights(botContext);
    return true;
  } catch (e) {
    console.log(e);

    return false;
  }
}
