'use strict';

exports.setupRememberAction = function (bot) {
    bot.onText(/\/remember(.+)/, (msg, match) => {

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

};