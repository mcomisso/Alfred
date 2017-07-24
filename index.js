'use strict';

require('dotenv').config();

// ARGS
var args = process.argv.slice(2);
var token = (args[0] == 'test') ? process.env.TEOBOTTEO_TOKEN : process.env.TELEGRAM_TOKEN;

// Actions
const cats = require('./actions/cats');
const setup = require('./actions/setup');
const weather = require('./actions/weather');
const remember = require('./actions/remember');
const texts = require('./actions/texts');

// Telegram BOT API
const TelegramBot = require('node-telegram-bot-api');


// const MATT_CHAT = 3729713;
// const SHARED_CHAT = -125161080;



const bot = new TelegramBot(token, {polling: true});

cats.registerCatAction(bot);
weather.registerWeatherAction(bot);
setup.registerSetupAction(bot);
remember.registerRememberAction(bot);
texts.registerTextsAction(bot);