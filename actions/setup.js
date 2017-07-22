'use strict';


const realm = require('../model');

// Setup: Save username/chatId

exports.registerSetupAction = function (bot) {
    bot.onText(/\/setup/, function (msg, match) {
        // Start the setup process

        var message = "Dear " + msg.from.first_name + ", please let me know your preferences.";

        realm.createNewUserFromMsg(msg);
        bot.sendMessage(msg.chat.id, "Saved");

        // Ask for nickname
        // bot.sendMessage(msg.chat.id, message, { reply_markup: JSON.stringify({ force_reply: true }) }).then(reply => {
        //     console.log(reply);
        // });
    });
};


/*
*
*
* { message_id: 252,
  from:
   { id: 3729713,
     first_name: 'Matteo',
     last_name: 'Comisso',
     username: 'teomatteo89',
     language_code: 'en-IT' },
  chat:
   { id: 3729713,
     first_name: 'Matteo',
     last_name: 'Comisso',
     username: 'teomatteo89',
     type: 'private' },
  date: 1500724907,
  text: '/cats',
  entities: [ { type: 'bot_command', offset: 0, length: 5 } ] }
* */