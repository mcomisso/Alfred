'use strict';

const _ = require('lodash');
const request = require('request');
let url = require('url');


exports.checkUrlExists = function (Url, callback) {

    request.head(Url, function (error, response, body){

        if (error) {
            console.error(error);
            callback(false);
            return;
        }

        if (response && response.statusCode == 200) {
            callback(true);
            return;
        }

        callback(false);
    });
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