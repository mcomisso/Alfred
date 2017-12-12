'use strict';

const giphy = require('giphy-api')();
const http = require('http');

var reqOptions = {
    host: 'setgetgo.com',
    path: '/randomword/get.php'
};

let callback = function(response) {
    var str = '';

    //another chunk of data has been received, so append it to `str`
    response.on('data', function (chunk) {
        str += chunk;
    });

    //the whole response has been received, so we just print it out here
    response.on('end', function () {
        console.log(str);
    });
}

exports.registerRandomAction = function (bot) {
    bot.onText(/\/random/, function (msg, match) {
        http.request(reqOptions, callback).end();
    });
}