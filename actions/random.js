'use strict';

const giphy = require('giphy-api')(process.env.GIPHY_DEVELOPMENT_KEY);
const http = require('http');

const request = require('request');
const _ = require('lodash');

const WORD_API = "http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

var sendRandomGif = function(bot, msg, word) {

    request(WORD_API, (error, response, body) => {
        if (error) {
            console.error(error);
            return;
        }
        
        if (response && response.statusCode == 200) {
            let respJson = JSON.parse(body);
            let word = respJson[0].word;

            giphyFromWordToMessage(bot, word, msg);
        }
    });
};

var giphyFromWordToMessage = function(bot, word, msg) {
    giphy.random(word, function (err, res) {
        if (err) {
            return;
        }
        bot.sendDocument(msg.chat.id, res.data.image_original_url, {caption: word});
    });
};

exports.registerRandomAction = function (bot) {

    bot.onText(/\/gif(.+)?/, function (msg, match) { 
        
        // removes first element
        match.shift();
        
        if (_.isEmpty(match)) {
            sendRandomGif(bot, msg, undefined); 
        } else {
            let searchedWord = match.join(" ");
            giphyFromWordToMessage(bot, searchedWord, msg);
        }
    });

    bot.onText(/\/random/, function (msg, match) {
        sendRandomGif(bot, msg, undefined);
    });
}