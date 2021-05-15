const admin = require('firebase-admin');


exports.sendMailing = async function(ctx) {
  try {
    const db = admin.firestore();

    const usersRef = db.collection('users');
    const users = await usersRef.get();

    const userIdsArray = [];

    if (!users.empty) {
      users.forEach(user => {
        userIdsArray.push(+user.id);
      });
    }

    const mailing = ctx.wizard.state;

    // telegram api could be called only 30 times in a second, so to make a mailing we need to wait about 40ms between each mail
    const telegramAPItimer = () => new Promise(res => setTimeout(res, 50));

    if ('photo' in mailing) {
      for (const userId of userIdsArray) {
        try {
          ctx.telegram.sendPhoto(userId, mailing.photo, {caption: mailing.text, parse_mode: 'HTML'});
        } catch {
          throw new Error(`User with id ${userId} didn't get mailing`);
        }

        await telegramAPItimer();
      }
    } else {
      for (const userId of userIdsArray) {
        try {
          ctx.telegram.sendMessage(userId, mailing.text, {parse_mode: 'HTML'});
        } catch {
          throw new Error(`User with id ${userId} didn't get mailing`);
        }

        await telegramAPItimer();
      }
    }

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
