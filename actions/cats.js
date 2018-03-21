'use strict';
const cats = require('cats-js');
const utils = require('../utils');

const botanio = require('../botan');

exports.registerCatAction = function (bot) {

    bot.onText(/\/cats/, function (msg, match) {
        var c = new cats();

        botanio.trackMessage(msg, 'cats');

        bot.sendChatAction(msg.chat.id, 'upload_photo');

        console.log(msg);
        c.get().then(cat => {

            utils.checkUrlExists(cat.images.image.url, function (success) {
                if (success) {
                    bot.sendPhoto(msg.chat.id, cat.images.image.url);
                } else {
                    throw "URL wasn't reachable.";
                }
            });
        }).catch((err) => {
            console.error(err.message);
            bot.sendMessage(msg.chat.id, 'This cat ran away! :(');
        });
    });

};

