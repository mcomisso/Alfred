'use strict';

require('dotenv').config();

// ARGS
var args = process.argv.slice(2);

const chrono = require('chrono-node');

// Actions
const cats = require('./actions/cats');
const setup = require('./actions/setup');
const weather = require('./actions/weather');

const realm = require('./model');

// Telegram BOT API
const TelegramBot = require('node-telegram-bot-api');

// const MATT_CHAT = 3729713;
// const SHARED_CHAT = -125161080;

var token = (args[0] == 'test') ? process.env.TEOBOTTEO_TOKEN : process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, {polling: true});

cats.registerCatAction(bot);
weather.registerWeatherAction(bot);
setup.registerSetupAction(bot);