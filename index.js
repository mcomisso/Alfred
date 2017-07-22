'use strict';

require('dotenv').config();

const chrono = require('chrono-node');
const utils = require('./utils');

// Actions
const cats = require('./actions/cats');
const weather = require('./actions/weather');


const realm = require('./model');

// Telegram BOT API
const TelegramBot = require('node-telegram-bot-api');

// const MATT_CHAT = 3729713;
// const SHARED_CHAT = -125161080;

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});

cats.registerCatAction(bot);
weather.registerWeatherAction(bot);

bot.onText(/\/remember(.+)/, (msg, match) => {

    switch (match[1]) {

        default:
            // Just print the list of saved memos

            var user = realm.findUserFromChatId(msg.chat.id);

            if (_.isUndefined(user)) {
                // Create user

                realm.createNewUserFromMsg(msg);
            }

    }

    // memo

    // scheduler

    var dateResults = chrono.parse(match.join(' '));
    var text = dateResults[0].text;
    var date = dateResults[0].start.date();

    console.log(msg);

    console.log(text);
    console.log(msg);
    console.log(date);

});
