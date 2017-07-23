'use strict';

const chrono = require('chrono-node');
const realm = require('../model');
var CronJob = require('cron').CronJob;
let moment = require('moment');
let _ = require('lodash');


exports.registerRememberAction = function (bot) {
    bot.onText(/\/remember(.+)/, (msg, match) => {

        // memo

        // scheduler

        let fullCommand = match.join(' ');

        let dateResults = chrono.parse(fullCommand);
        var timeString = dateResults[0].text;
        var alertDate = dateResults[0].start.date();

        let preAlert = moment(alertDate).subtract(30, 'minutes');

        console.log(msg);

        console.log(timeString);
        console.log(alertDate);

        let alertText = "";

        // Save the reminder into realm
        realm.createReminder(msg.chat.id, alertText, alertDate);

        let reminderCronJob = new CronJob(alertDate, function () {

            let message = "";
            bot.sendMessage(msg.chat.id, message);
        });

        let prevReminderCronJob = new CronJob(preAlert, function () {
            let prevMessage = "Sir, remember to " + " " + "in 30 minutes.";
            bot.sendMessage(msg.chat.id, prevMessage);
        });

        // Start the cronJob?
        reminderCronJob.start();
        prevReminderCronJob.start();

    });


    bot.onText(/\/memos/, function (msg, match) {
        // list all available memos

    });
};
