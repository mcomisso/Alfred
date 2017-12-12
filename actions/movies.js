'use strict';

const _ = require('lodash');
var request = require('request');
let csvjson = require('csvjson');


// Should be able to register movies, keep track of movies, rate movies, random movies

let convertCSVToMovieData = function (data) {
    let json = csvjson.toObject(data);
    return json;
};

exports.registerMoviesAction = function (bot) {

    bot.onText(/\/addMovie(.+)/, function (msg, match) {
        const chatId = msg.chat.id;

        let fullText = match.join(" ");

        let movie = { title: fullText };
    });

    bot.onText(/\/deleteMovie/, function (msg, match) {
        const chatId = msg.chat.id;

    });



    bot.onText(/\/goodMovie/, function (msg, match) {

        const chatId = msg.chat.id;


        let worthMovies = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTiEJDZIUsXVy4PaFvgnIeAIKSrNjMQrv4XoIcbK7fNhZahpWodv7hw_cdUnQWco3ghhHtL-lHAsISL/pub?gid=0&single=true&output=csv"

        request.get({
            url: worthMovies,
            json: true,
            headers: {'User-Agent': 'request'}
        }, (err, resp, data) => {
            if (err){
                console.error(err);
            } else if (resp.statusCode !== 200) {
                console.error("Response wasn't 200");
            } else {
                //Data is here

                console.log(convertCSVToMovieData(data));

            }
        });

    });

    bot.onText(/\/randomMovie/, function (msg, match) {

        const chatId = msg.chat.id;

        let randomMovies = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTiEJDZIUsXVy4PaFvgnIeAIKSrNjMQrv4XoIcbK7fNhZahpWodv7hw_cdUnQWco3ghhHtL-lHAsISL/pub?gid=1374560642&single=true&output=csv"

        request.get({
            url: randomMovies,
            json: true,
            headers: {'User-Agent': 'request'}
        }, (err, resp, data) => {
            if (err){
                console.error(err);
            } else if (resp.statusCode !== 200) {
                console.error("Response wasn't 200");
            } else {

            }
        });

    });

};
