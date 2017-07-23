'use strict';

const _ = require('lodash');

let http = require('http');
let url = require('url');

exports.checkUrlExists = function (Url, callback) {
    let options = {
        method: 'HEAD',
        host: url.parse(Url).host,
        port: 80,
        path: url.parse(Url).pathname
    };
    let req = http.request(options, function (r) {
        callback( r.statusCode == 200);});

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    req.end();
};

exports.calculateMinMax = function (values, key) {
    var retval = {};

    let streamlinedValues = _.map(values, key);

    retval['min'] = _.min(streamlinedValues);
    retval['max'] = _.max(streamlinedValues);

    return retval;
};

exports.userDataFromMsg = function (msg) {
    let data = {
        first_name: msg.from.first_name,
        last_name: msg.from.last_name
    };
    return data
};