const functions = require('firebase-functions');
const express = require('express');
const constants = require('./constants');
const { mainMenuKeyboard } = require('./keyboards/mainMenu');


const app = express();
app.use(express.urlencoded({extended: true}));

let isBotInitialized = false;
let isAppInitialized = false;
let isWebhookSet = false;
let bot;

if (!isWebhookSet) {
  setWebhook();
}


function setWebhook() {
  const fetch = require('node-fetch');
  require('dotenv').config();

  const {
    TELEGRAM_BOT_TOKEN,
    SERVER_URL,
  } = process.env;

  const telegramAPI = 'https://api.telegram.org/'

  fetch(`${telegramAPI}bot${TELEGRAM_BOT_TOKEN}/setWebhook?url=${SERVER_URL}`)
    .then(res => {
      console.log('Webhook has been set with status: ', res.status);
    })
  .catch(e => console.log(e));
}


app.post('/', async (req, res) => {
  if (!isAppInitialized && !isBotInitialized) {
    await initializeAll();
  } else if (!isBotInitialized) {
    await initializeBot();
  } else if (!isAppInitialized) {
    await initializeApplication();
  }

  //#region Bot update handlers

  bot.start(async ctx => {
    const { createUser } = require('./actions/user/createUser');
    const { checkUserExists } = require('./actions/user/checkUserExists');

    await ctx.replyWithHTML(constants.greetings);
    await ctx.replyWithHTML(constants.howTo);
    ctx.replyWithHTML(constants.mainMenu, mainMenuKeyboard());

    if (!await checkUserExists(ctx.update.message.chat.id)) {
      await createUser(ctx.update.message.chat.id);
    }
  });

  bot.help(ctx => ctx.replyWithHTML(constants.help));

  bot.command('stopreminders', async ctx => {
    const { stopAllReminders } = require('./actions/reminders/stopAllReminders');

    await stopAllReminders(ctx.update.message.chat.id);
    ctx.replyWithHTML(constants.remindersDeleted);
  });

  bot.command('setreminders', ctx => ctx.scene.enter('SET_REMINDERS_SCENE'));

  bot.command('admin', ctx => ctx.scene.enter('ADMIN_SCENE'));

  bot.command('setNewPassword', ctx => ctx.scene.enter('SET_ADMIN_PASSWORD_SCENE'));

  bot.command('createMailing', ctx => ctx.scene.enter('CREATE_MAILING_SCENE'));

  bot.action(/^completed/, ctx => {
    const { repeatReminderKeyboard } = require('./keyboards/repeatReminder');

    const reminderIndex = ctx.update.callback_query.data.split('_')[1];
    ctx.replyWithHTML(constants.requestRepeatReminder.replace('NUMBER', reminderIndex), repeatReminderKeyboard(reminderIndex));
  });

  bot.action(/^repeatReminder/, async ctx => {
    const { setReminderAgain } = require('./actions/reminders/setReminderAgain');

    const reminderIndex = ctx.update.callback_query.data.split('_')[1];
    const res = setReminderAgain(ctx.update.callback_query.message.chat.id, +reminderIndex);

    if (res) {
      await ctx.replyWithHTML(constants.repeatReminderSuccess.replace('NUMBER', reminderIndex));
    } else {
      await ctx.replyWithHTML(constants.repeatReminderFailure);
    }

    ctx.replyWithHTML(constants.mainMenu, mainMenuKeyboard());
  });

  //#endregion

  await bot.handleUpdate(req.body);

  res.send('Got the post request on the server side!');
});


async function initializeAll() {
  return Promise.allSettled([initializeApplication(), initializeBot()]);
}

async function initializeApplication() {
  const serviceAccount = require('./serviceAccountKey.json');
  const admin = require('firebase-admin');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  isAppInitialized = true;
  
  return isAppInitialized;
}


async function initializeBot() {
  require('dotenv').config();
  const { authorize } = require('./actions/admin/access/authorize');
  const { setAdminPassword } = require('./actions/admin/access/setAdminPassword');
  const { createMailing } = require('./actions/admin/mailing/createMailing');
  const { setReminders } = require('./actions/reminders/setReminders');
  const {Telegraf, Stage, session} = require('telegraf');

  //#region Basic bot configuration

  const { TELEGRAM_BOT_TOKEN } = process.env;

  bot = new Telegraf(TELEGRAM_BOT_TOKEN);
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

  //#endregion

  isBotInitialized = true;

  return isBotInitialized;
}


exports.app = functions.https.onRequest(app);
exports.remind = functions.pubsub.schedule('0 19 * * *').timeZone('Europe/Moscow').onRun(() => {
  const { remind } = require('./actions/reminders/remind');

  remind(bot)
});
