'use strict';

const giphy = require('giphy-api')('wWv4Mbmn3Yyn77TWV6xtMGEhx4S6TyJd');
const http = require('http');

const request = require('request');

const WORD_API = "http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

exports.registerRandomAction = function (bot) {
    bot.onText(/\/random/, function (msg, match) {
        request(WORD_API, (error, response, body) => {
            if (error) {
                console.error(error);
                return;
            }
            
            if (response && response.statusCode == 200) {
                let respJson = JSON.parse(body);
                let word = respJson[0].word;

                giphy.random('word', function (err, res) {
                    if (err) {
                        return;
                    }
                    bot.sendDocument(msg.chat.id, res.data.image_original_url, {caption: word});
                    console.log(res);
                });
            }
        });
    });
}