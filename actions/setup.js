'use strict';


const model = require('../model');

// Setup: Save username/chatId

exports.registerSetupAction = function (bot) {
    bot.onText(/\/setup/, function (msg, match) {
        // Start the setup process

        var message = "Dear " + msg.from.first_name + ", please let me know your preferences.";

        model.createNewUserFromMsg(msg);
        bot.sendMessage(msg.chat.id, "Saved");

        // Ask for nickname
        // bot.sendMessage(msg.chat.id, message, { reply_markup: JSON.stringify({ force_reply: true }) }).then(reply => {
        //     console.log(reply);
        // });
    });


    bot.onText(/\/alert (.+)/, function (msg, match) {

        let confirmation = match[1] === 'on' ? "You will now receive alerts about the daily weather." : "You will not receive any alert";



        bot.sendMessage(msg.chat.id, confirmation);
    });
};
