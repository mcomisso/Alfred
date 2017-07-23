'use strict';

let botan = require('botanio')(process.env.BOTAN_API_KEY);

exports.trackMessage = function (msg, actionName) {
    botan.track(msg, actionName);
};