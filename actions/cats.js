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
            //console.log(cat);
            //console.log(cat.images.image.url);

            utils.checkUrlExists(cat.images.image.url, function (success) {
                if (success) {
                    bot.sendPhoto(msg.chat.id, cat.images.image.url);
                }
            });
        }).catch((err) => {
            console.error(err.message);
            bot.sendMessage(msg.chat.id, 'Cat ran away! :(');
        });
    });

};

