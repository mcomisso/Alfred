
require('dotenv').config();

const _ = require('lodash');
const s = require("underscore.string");
const utils = require('../utils');

// DARKSKY service
const DarkSky = require('dark-sky');
const forecast = new DarkSky(process.env.DARKSKY_TOKEN);

// Coordinates api
const getCoords = require('city-to-coords');

// Home position
const LATITUDE = 51.486417;
const LONGITUDE = -0.211119;
const London = forecast.latitude(LATITUDE).longitude(LONGITUDE).units('si');

exports.registerWeatherAction = function (bot) {

    bot.onText(/\/weather(.+)?/, function (msg, match) {

        const chatId = msg.chat.id;

        var exclude = ["currently", "minutely", "hourly", "daily", "alerts", "flags"];
        var key = "currently";

        var parseResponse;

        var switchValue;
        if (_.isUndefined(match[1]) || _.isEmpty(match[1])) {
            switchValue = "today";
        } else {
            switchValue = s(match[1]).trim().value();
        }

        switch (switchValue) {

            case "now":

                key = "currently";
                parseResponse = function (response) {
                    const resp = response[key];
                    var message = "It's currently " + resp.summary + " and " + Math.round(resp.temperature) + "°C in London.";
                    return message;
                };
                break;

            case "today":

                key = "hourly";
                parseResponse = function (response) {
                    const resp = response[key];

                    var temps = utils.calculateMinMax(resp.data, 'temperature');

                    var message = "Today will be " + resp.summary + "There will be a high of " + Math.round(temps['max']) + "°C and a min of " + Math.round(temps['min']) + "°C.";
                    return message;
                };
                break;

            case "tomorrow":
                key = "daily";

                parseResponse = function (response) {
                    const resp = response[key];

                    //var temps = utils.calculateMinMax(resp.data, 'temperature');

                    var message = "Tomorrow will be " + resp.summary;
                    return message;
                };
                break;

            default:
                getCoords(switchValue)
                    .then((coords) => {
                        forecast.latitude(coords.lat).longitude(coords.lng).units('si').get().then((response)=>{
                            var message = response.hourly.summary;
                            var temps = utils.calculateMinMax(response.hourly.data, 'temperature');
                            message = message + " There will be a high of " + Math.round(temps['max']) + "°C and a min of " + Math.round(temps['min']) + "°C.";
                            bot.sendMessage(chatId, message);
                        });
                    });
                return;
                break;

        }

        var index = exclude.indexOf(key);
        exclude.splice(index, 1);

        London.exclude(exclude).get().then(function (response) {
            // Print response
            // console.log(response);
            var message = parseResponse(response);
            bot.sendMessage(chatId, message);
        });
    });

};