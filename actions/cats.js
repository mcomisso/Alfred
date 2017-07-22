'use strict';
const cats = require('cats-js');
const utils = require('../utils');

exports.registerCatAction = function (bot) {

    bot.onText(/\/cats/, function (msg, match) {
        var c = new cats();

        console.log(msg);
        c.get().then(cat => {
            //console.log(cat);
            //console.log(cat.images.image.url);

            utils.checkUrlExists(cat.images.image.url, function (success) {
                if (success) {
                    bot.sendPhoto(msg.chat.id, cat.images.image.url);
                } else {
                    bot.sendMessage(msg.chat.id, "No cats available :(");
                }
            });
        });
    });

};

