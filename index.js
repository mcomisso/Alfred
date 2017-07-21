'use strict';

require('dotenv').config();

// DARKSKY service
const DarkSky = require('dark-sky');
const forecast = new DarkSky(process.env.DARKSKY_TOKEN);
const _ = require('underscore');
const chrono = require('chrono-node');
const s = require("underscore.string");

// Telegram BOT API
const TelegramBot = require('node-telegram-bot-api');

// Home position
const LATITUDE = 51.486417;
const LONGITUDE = -0.211119;
const London = forecast.latitude(LATITUDE).longitude(LONGITUDE).units('si');

const utils = require('./utils');

// const MATT_CHAT = 3729713;
// const SHARED_CHAT = -125161080;

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});

bot.onText(/\/weather(.+)?/, function(msg, match) {

    const chatId = msg.chat.id;

    var exclude = ["currently", "minutely", "hourly", "daily", "alerts", "flags"];
    var key = "currently";

    var parseResponse;

    var switchValue;
    if (_.isUndefined(match[1])) {
        switchValue = "now";
    } else {
        switchValue = s(match[1]).trim().value();
    }


    switch (switchValue) {

        case "now":

            key = "currently";
            parseResponse = function(response) {
                const resp = response[key];
                var message = "It's currently " + resp.summary + " and " + Math.round(resp.temperature) + "°C in London.";
                return message;
            };
            break;

        case "today":

            key = "hourly";
            parseResponse = function(response) {
                const resp = response[key];

                var temps = utils.calculateMinMax(resp.data, 'temperature');

                var message = "Today will be " + resp.summary + "There will be a high of " + Math.round(temps['max']) + "°C and a min of " + Math.round(temps['min']) + "°C.";
                return message;
            };
            break;

        case "tomorrow":
            key = "daily";

            parseResponse = function (response) {
                const resp = response[key];

                //var temps = utils.calculateMinMax(resp.data, 'temperature');

                var message = "Tomorrow will be " + resp.summary;
                return message;
            };
            break;

        default:
            break;

    }

    var index = exclude.indexOf(key);
    exclude.splice(index, 1);

    London.exclude(exclude).get().then(function(response) {
        // Print response
        console.log(response);
        var message = parseResponse(response);
        bot.sendMessage(chatId, message);
    });
});

bot.onText(/\/remember (.+)/, function (msg, match) {
    // memo

    // scheduler

    var dateResults = chrono.parse(match.join(' '));
    var text = dateResults[0].text;
    var date = dateResults[0].start.date();

    console.log(msg);

    msg.replace(text, '');
    console.log(text);
    console.log(msg);
    console.log(date);
});

/*
* forecast
    .latitude('37.8267')            \\ required: latitude, string.
    .longitude('-122.423')          \\ required: longitude, string.
    .time('2016-01-28')             \\ optional: date, string 'YYYY-MM-DD'.
    .units('ca')                    \\ optional: units, string, refer to API documentation.
    .language('en')                 \\ optional: language, string, refer to API documentation.
    .exclude('minutely,daily')      \\ optional: exclude, string, refer to API documentation.
    .extendHourly(true)             \\ optional: extend, boolean, refer to API documentation.
    .get()                          \\ execute your get request.
    .then(res => {                  \\ handle your success response.
        console.log(res)
    })
    .catch(err => {                 \\ handle your error response.
        console.log(err)
    })
* */