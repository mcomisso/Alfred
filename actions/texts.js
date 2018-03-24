'use strict';

let db = require('../model');

exports.registerTextsAction = function (bot) {

    bot.on('message', function (msg) {
        // save the message in database

        if (msg.text.includes("┻━┻")) {
            bot.sendMessage(msg.chat.id, "┬─┬ ノ( ゜-゜ノ)");
        }

    });
}