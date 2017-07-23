'use strict';

const chrono = require('chrono-node');
const realm = require('../model');
var CronJob = require('cron').CronJob;


exports.registerRememberAction = function (bot) {
    bot.onText(/\/remember(.+)/, (msg, match) => {

        // memo

        // scheduler

        let fullCommand = match.join(' ');

        let dateResults = chrono.parse(fullCommand);
        var timeString = dateResults[0].text;
        var date = dateResults[0].start.date();

        console.log(msg);

        console.log(timeString);
        console.log(date);

        let cron = new CronJob(date, function () {

            bot.sendMessage(msg.chat.id, message);
        });

        // Start the cronJob?
        cron.start()

    });

};