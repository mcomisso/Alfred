'use strict';

const _ = require('underscore');

const minMax = function (values, key) {
    var retval = {};

    var streamlinedValues = _.pluck(values, key);

    retval['min'] = _.min(streamlinedValues);
    retval['max'] = _.max(streamlinedValues);

    return retval;
};

const functions = {
    calculateMinMax: minMax
};


module.exports = functions;