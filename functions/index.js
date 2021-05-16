const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const {Telegraf, Stage, session} = require('telegraf');
const constants = require('./constants');
const fetch = require('node-fetch');
require('dotenv').config();
const { createUser } = require('./actions/user/createUser');
const { checkUserExists } = require('./actions/user/checkUserExists');
const serviceAccount = require('./serviceAccountKey.json');
const { authorize } = require('./actions/admin/access/authorize');
const { mainMenuKeyboard } = require('./keyboards/mainMenu');
const { setAdminPassword } = require('./actions/admin/access/setAdminPassword');
const { createMailing } = require('./actions/admin/mailing/createMailing');
const { stopAllReminders } = require('./actions/reminders/stopAllReminders');
const { handleNewReminders } = require('./actions/reminders/handleNewReminders');
const { remind } = require('./actions/reminders/remind');
const { setReminders } = require('./actions/reminders/setReminders');

//#region Basic bot, express and functions configuration

const {
  TELEGRAM_BOT_TOKEN,
  SERVER_URL,
  SECRET_PATH
} = process.env;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
const botContext = bot.context;
bot.context.admins = [];

const stage = new Stage(
  [
    authorize(botContext),
    setAdminPassword(botContext),
    createMailing(botContext),
    setReminders()
  ]
);

bot.use(session());
bot.use(stage.middleware());
bot.use()

const app = express();
app.use(express.urlencoded({extended: true}));

//#endregion

//#region Webhook configuration to initialize bot on the firebase

// const telegramAPI = 'https://api.telegram.org/'

// fetch(`${telegramAPI}bot${TELEGRAM_BOT_TOKEN}/setWebhook?url=${SERVER_URL}${SECRET_PATH}`)
//   .then(res => {
//     console.log('Setting webhook status: ', res.status);
//   })
//   .catch(e => console.log(e));

// app.use(bot.webhookCallback(SECRET_PATH));

// app.post('/', (req, res) => {
//   bot.handleUpdate(req.body);
//   res.send('Got the post request on the server side!');
// });

//#endregion

//#region Bot handlers

bot.start(async ctx => {
  if (!await checkUserExists(ctx.update.message.chat.id)) {
    await createUser(ctx.update.message.chat.id);
  }

  await ctx.replyWithHTML(constants.greetings);
  await ctx.replyWithHTML(constants.howTo);
  ctx.replyWithHTML(constants.mainMenu, mainMenuKeyboard());
});

bot.help(ctx => {
  console.log(ctx);
  ctx.replyWithHTML(constants.help)} 
);

bot.command('stopreminders', async ctx => {
  await stopAllReminders(ctx.update.message.chat.id);
  ctx.replyWithHTML(constants.remindersDeleted);
});

bot.command('setreminders', ctx => ctx.scene.enter('SET_REMINDERS_SCENE'));

bot.command('admin', ctx => ctx.scene.enter('ADMIN_SCENE'));

bot.command('setNewPassword', ctx => ctx.scene.enter('SET_ADMIN_PASSWORD_SCENE'));

bot.command('createMailing', ctx => ctx.scene.enter('CREATE_MAILING_SCENE'));

bot.launch();

//#endregion

exports.app = functions.https.onRequest(app);
exports.remind = functions.pubsub.schedule('0 12 * * *').timeZone('Europe/Moscow').onRun(() => {
  bot.telegram.sendMessage(188855739, 'Oh, hi!');
  return null;
});
