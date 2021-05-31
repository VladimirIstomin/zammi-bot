const admin = require('firebase-admin');
const { deleteAllAdminRights } = require('./deleteAllAdminRights.js');
const bcrypt = require('bcrypt');


exports.handleNewAdminPassword = async function(password) {
  try {
    const saltRounds = 10;

    const db = admin.firestore();
    
    const passwordRef = db.collection('admin').doc('password');

    bcrypt.hash(password, saltRounds, async (e, hash) => {
      if (e) {
        return false;
      }

      await passwordRef.update({
        password: hash
      });

      return true;
    });
    
    await deleteAllAdminRights();
    
    return true;
  } catch (e) {
    console.log(e);

    return false;
  }
}
