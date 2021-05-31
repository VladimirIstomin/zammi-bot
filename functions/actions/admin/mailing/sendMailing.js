const admin = require('firebase-admin');
const { telegramAPITimer } = require('../../timer/telegramAPITimer');


exports.sendMailing = async function(ctx) {
  try {
    const db = admin.firestore();

    const usersRef = db.collection('users');
    const usersFirestoreObject = await usersRef.get();

    const users = [];

    if (!usersFirestoreObject.empty) {
      usersFirestoreObject.forEach(user => users.push(+user.id));
    }

    const mailing = ctx.wizard.state;

    if ('photo' in mailing) {
      for (const user of users) {
        try {
          ctx.telegram.sendPhoto(user, mailing.photo, {caption: mailing.text, parse_mode: 'HTML'});
        } catch (e) {
          console.log(e);
        }

        await telegramAPItimer();
      }
    } else {
      for (const user of users) {
        try {
          ctx.telegram.sendMessage(user, mailing.text, {parse_mode: 'HTML'});
        } catch (e) {
          console.log(e);
        }

        await telegramAPITimer();
      }
    }

    return true;
  } catch (e) {
    console.log(e);

    return false;
  }
}
