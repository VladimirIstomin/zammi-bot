const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const {Telegraf} = require('telegraf');
const constants = require('./constants');
const fetch = require('node-fetch');
require('dotenv').config();
const {TELEGRAM_BOT_TOKEN, SERVER_URL} = process.env;

//#region Basic bot, express and functions configuration

admin.initializeApp();

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

const app = express();
app.use(express.urlencoded({extended: true}));

//#endregion

//#region Webhook configuration to initialize bot on the firebase

const telegramAPI = 'https://api.telegram.org/'

fetch(`${telegramAPI}bot${TELEGRAM_BOT_TOKEN}/setWebhook?url=${SERVER_URL}`)
  .then(res => {
    console.log(res);
  })
  .catch(e => console.log(e));

app.post('/', (req, res) => {
  bot.handleUpdate(req.body);
  res.send('Got the post request on the server side!');
});

//#endregion

//#region Bot handlers

bot.start(ctx => {
  ctx.reply(constants.greetings);
});

//#endregion

exports.app = functions.https.onRequest(app);
