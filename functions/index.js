const functions = require('firebase-functions');
const express = require('express');
const constants = require('./constants');
const { mainMenuKeyboard } = require('./keyboards/mainMenu');
const admin = require('firebase-admin');
require('firebase-functions/lib/logger/compat');

//#region Global settings

const app = express();
app.use(express.urlencoded({extended: true}));

let isBotInitialized = false;
let botInitializing = false; // false or Promise

let isAppInitialized = false;
let appInitializing = false; // false or Promise

let isWebhookSet = false;
let bot;

let reminders = [];
let plantsCare = [];
let admins = [];

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

  fetch(`${constants.telegramAPI}bot${TELEGRAM_BOT_TOKEN}/setWebhook?url=${SERVER_URL}`)
    .then(res => {
      console.log('Webhook has been set with status: ', res.status);
      isWebhookSet = true;
    })
  .catch(e => console.log(e));
}

//#endregion

// comment the next block of code
// initializeBot();
// initializeApplication();


app.post('/', async (req, res) => {
  await handleInitialization();

  if (reminders.length === 0) {
    await addRemindersChangeListener();
  }

  if (plantsCare.length ===0) {
    await addPlantsCareListener();
  }

  if (admins.length === 0) {
    await addAdminsListener();
  }

  //#region Bot update handlers
  
  bot.start(async ctx => {
    const { createUser } = require('./actions/user/createUser');
    const { checkUserExists } = require('./actions/user/checkUserExists');

    await ctx.replyWithHTML(constants.greetings);
    ctx.replyWithHTML(constants.mainMenu, mainMenuKeyboard());

    if (!await checkUserExists(ctx.message.chat.id)) {
      await createUser(ctx.message.chat.id);
    }
  });


  bot.hears(constants.aboutButton, ctx => {ctx.replyWithHTML(constants.about)});


  bot.hears(constants.ourPlantsButton, ctx => ctx.replyWithHTML(constants.websiteUrl));


  bot.hears(constants.ourServicesButton, ctx => ctx.replyWithHTML(constants.websiteUrl));


  bot.hears(constants.plantCareButton, async ctx => {
    const {plantMenuKeyboard} = require('./keyboards/plantMenu');


    ctx.replyWithHTML(constants.plantCareMenu, plantMenuKeyboard(plantsCare));
  });


  bot.hears(constants.remindersButton, ctx => {
    const {remindersMenuKeyboard} = require('./keyboards/remindersMenu');
    ctx.replyWithHTML(constants.remidersMenu, remindersMenuKeyboard());
  });


  bot.hears(constants.deleteAllRemindersButton, async ctx => {
    const { stopAllReminders } = require('./actions/reminders/stopAllReminders');

    await stopAllReminders(ctx.message.chat.id);
    ctx.replyWithHTML(constants.remindersDeleted);
  });


  bot.hears(constants.setRemindersButton, async ctx => {
    ctx.reminders = reminders;
    ctx.scene.enter('SET_REMINDERS_SCENE', ctx);
  });


  bot.command('admin', ctx => {
    ctx.admins = admins;
    ctx.scene.enter('ADMIN_SCENE', ctx);
  });


  bot.command('setNewPassword', ctx => {
    ctx.admins = admins;
    ctx.scene.enter('SET_ADMIN_PASSWORD_SCENE', ctx);
  });


  bot.command('createMailing', ctx => {
    ctx.admins = admins;
    ctx.scene.enter('CREATE_MAILING_SCENE', ctx);
  });


  bot.action(/^comp/, ctx => {
    const { repeatReminderKeyboard } = require('./keyboards/repeatReminder');

    const reminderId = ctx.update.callback_query.data.split('_')[1];
    ctx.replyWithHTML(constants.requestRepeatReminder, repeatReminderKeyboard(reminderId));
  });


  bot.action(/^rep/, async ctx => {
    const { setReminderAgain } = require('./actions/reminders/setReminderAgain');

    const reminderId = ctx.update.callback_query.data.split('_')[1];
    const res = setReminderAgain(reminders, ctx.update.callback_query.message.chat.id, reminderId);

    if (res) {
      await ctx.replyWithHTML(constants.repeatReminderSuccess);
    } else {
      await ctx.replyWithHTML(constants.repeatReminderFailure);
    }

    ctx.replyWithHTML(constants.mainMenu, mainMenuKeyboard());
  });


  bot.hears(constants.backToMainMenuButton, ctx => ctx.replyWithHTML(constants.mainMenu, mainMenuKeyboard()));


  bot.on(['text'], async ctx => {
    const plant = plantsCare.filter(plant => plant.name === ctx.message.text);
    if (plant.length > 0) {
      ctx.replyWithPhoto(plant[0].imageUrl, {caption: plant[0].careDescription, parse_mode: 'HTML'});
    }

    if (plant.length > 1) {
      throw new Error(`There are more than one plant with name "${plant[0].name}"`);
    }
  });

  //#endregion

  await bot.handleUpdate(req.body);

  res.send('Got the post request on the server side!');
});

//#region Initialization functions

async function handleInitialization() {
  if (!isAppInitialized && !appInitializing && !isBotInitialized && !botInitializing) {
    await initializeAll();
  } else if (!isBotInitialized && !botInitializing) {
    botInitializing = initializeBot();
    botInitializing = await botInitializing;
  } else if (!isAppInitialized && !appInitializing) {
    appInitializing = initializeApplication();
    appInitializing = await appInitializing;
  } else if (appInitializing || botInitializing) {
    await Promise.all([botInitializing, appInitializing]);
  }
}


async function initializeAll() {
  // it's made to show that app and bot are initialing (i.e. they are Promises),
  // so that other functions could wait for them being initialized
  let allInitializing = Promise.all([initializeApplication(), initializeBot()]);
  appInitializing = botInitializing = allInitializing;
  [appInitializing, botInitializing] = await allInitializing;
}


async function initializeApplication() {
  const serviceAccount = require('./serviceAccountKey.json');
  const admin = require('firebase-admin');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  isAppInitialized = true;
  
  return false; // appInitializing = false
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

  //comment the next line
  // bot.launch();

  const botContext = bot.context;
  botContext.admins = [];

  const stage = new Stage(
    [
      authorize(),
      setAdminPassword(),
      createMailing(),
      setReminders()
    ]
  );

  bot.use(session());
  bot.use(stage.middleware());

  //#endregion

  isBotInitialized = true;

  return false; // botInitializing =  false
}

//#endregion

//#region Database updates listeners

async function addRemindersChangeListener() {
  const db = admin.firestore();

  const remindersRef = db.collection('reminders');

  const observer = remindersRef.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        reminders.push({id: change.doc.id, ...change.doc.data()});
      } else if (change.type === 'modified') {
        reminders.find((reminder, index) => {
          if (reminder.id === change.doc.id) {
            reminders[index] = change.doc.data();
            return true;
          }
        });
      } else if (change.type === 'removed') {
        reminders.find((reminder, index) => {
          if (reminder.id === change.doc.id) {
            reminders.splice(index, 1);
            return true;
          }
        });
      }
    });
  }, e => console.log(e));

  return null;
}


async function addPlantsCareListener() {
  const db = admin.firestore();

  const plantsCareRef = db.collection('plantsCare');

  const observer = plantsCareRef.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        plantsCare.push({id: change.doc.id, ...change.doc.data()});
      } else if (change.type === 'modified') {
        plantsCare.find((reminder, index) => {
          if (reminder.id === change.doc.id) {
            plantsCare[index] = change.doc.data();
            return true;
          }
        });
      } else if (change.type === 'removed') {
        plantsCare.find((reminder, index) => {
          if (reminder.id === change.doc.id) {
            plantsCare.splice(index, 1);
            return true;
          }
        });
      }
    });

  }, e => console.log(e));

  return null;
}

async function addAdminsListener() {
  const db = admin.firestore();

  const adminsRef = db.collection('admin').doc('admins');

  const observer = adminsRef.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      admins = change.doc.data(); // it's needed to be updated


      // if (change.type === 'added') {
      //   admins.push({id: change.doc.id, ...change.doc.data()});
      // } else if (change.type === 'modified') {
      //   admins.find((reminder, index) => {
      //     if (reminder.id === change.doc.id) {
      //       plantsCare[index] = change.doc.data();
      //       return true;
      //     }
      //   });
      // } else if (change.type === 'removed') {
      //   admins.find((reminder, index) => {
      //     if (reminder.id === change.doc.id) {
      //       admins.splice(index, 1);
      //       return true;
      //     }
      //   });
      // }
    });

  }, e => console.log(e));

  return null;
}

//#endregion

exports.app = functions.https.onRequest(app);


exports.remind = functions.pubsub.schedule('0 19 * * *').timeZone('Europe/Moscow').onRun(() => {
  const { remind } = require('./actions/reminders/remind');

  remind(bot);

  return null;
});
